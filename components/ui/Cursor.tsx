"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import styles from "./Cursor.module.css";
function Heart({ className }: { className?: string }) { return <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="white"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/></svg>; }

type CursorKind = "default" | "hover" | "link" | "text" | "like";

// Geometry only — colour per kind lives in globals.css under `.cursor-ring[data-kind=...]`.
// Pressing is a separate flag (see `isPressed`) so a mouse-down never wipes out the
// hover/like styling the way a combined state machine did.
const RING: Record<CursorKind, { width: number; height: number; borderRadius: number }> = {
  default: { width: 28, height: 28, borderRadius: 9999 },
  // Only slightly larger than default: at 40px this swallowed small card buttons.
  hover: { width: 34, height: 34, borderRadius: 9999 },
  link: { width: 44, height: 44, borderRadius: 9999 },
  like: { width: 44, height: 44, borderRadius: 9999 },
  text: { width: 4, height: 26, borderRadius: 4 },
};

// <input> types that are buttons/pickers rather than text entry — those want the ring, not the beam.
const NON_TEXT_INPUT_TYPES = new Set([
  "button",
  "submit",
  "reset",
  "checkbox",
  "radio",
  "file",
  "range",
  "color",
  "image",
]);

const LINK_SELECTOR = 'a[href], [data-cursor="link"], .link-hover';

const INTERACTIVE_SELECTOR =
  'button:not(:disabled), select, [role="button"], [data-cursor="pointer"], .interactive-hover';

// The arrow's tip sits at (3,3) of a 24-unit viewBox rendered at 20px, i.e. 2.5px in from the
// SVG's top-left corner. Shift the art so that vertex lands on the real pointer position.
const ARROW_TIP_OFFSET = 2.5;

export function Cursor() {
  const [cursorKind, setCursorKind] = useState<CursorKind>("default");
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Read inside listeners without making them a hook dependency — otherwise every visibility
  // flip tears down and re-attaches the whole listener set.
  const isVisibleRef = useRef(false);

  // Tracks the exact pointer position. The arrow reads from this directly
  // (no spring lag on position) — the arrow anchors precision.
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Duration-based smooth ease for the ring — feels like a clean CSS transition
  // rather than a physics spring. Zero bounce, just a gentle 150ms glide.
  const ringX = useSpring(mouseX, { duration: 0.15, bounce: 0 });
  const ringY = useSpring(mouseY, { duration: 0.15, bounce: 0 });

  useEffect(() => {
    // Devices without a fine pointer keep their native behaviour. Watch the query rather than
    // sampling it once, so plugging a mouse into a tablet switches the cursor on.
    const touchMedia = window.matchMedia("(hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)");
    const syncTouch = () => setIsTouchDevice(touchMedia.matches);
    syncTouch();
    touchMedia.addEventListener("change", syncTouch);
    return () => touchMedia.removeEventListener("change", syncTouch);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const show = () => {
      if (isVisibleRef.current) return;
      isVisibleRef.current = true;
      setIsVisible(true);
    };
    const hide = () => {
      if (!isVisibleRef.current) return;
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    const updateCursorKind = (target: Element | null) => {
      if (!target?.closest) {
        setCursorKind("default");
        return;
      }

      if (target.closest('[data-cursor="like"], .like-button, .testimonial-card')) {
        setCursorKind("like");
        return;
      }

      const field = target.closest("input, textarea, [contenteditable='true']");
      const isTextField =
        field !== null &&
        !(field instanceof HTMLInputElement && NON_TEXT_INPUT_TYPES.has(field.type));
      if (isTextField) {
        setCursorKind("text");
        return;
      }

      if (target.closest(LINK_SELECTOR)) {
        setCursorKind("link");
        return;
      }

      if (target.closest(INTERACTIVE_SELECTOR)) {
        setCursorKind("hover");
        return;
      }

      if (target.closest('p, h1, h2, h3, h4, h5, h6, [data-cursor="text"]')) {
        setCursorKind("text");
        return;
      }

      setCursorKind("default");
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      show();
      // Self-heal a stuck "pressed" state: releasing the button outside the window never
      // delivers a mouseup, so trust the button bitmask on the next move instead.
      if (e.buttons === 0) setIsPressed(false);
      updateCursorKind(e.target as Element | null);
    };

    const handleScroll = () => {
      if (!isVisibleRef.current) return;
      const x = mouseX.get();
      const y = mouseY.get();
      if (x >= 0 && y >= 0 && x <= window.innerWidth && y <= window.innerHeight) {
        const target = document.elementFromPoint(x, y);
        updateCursorKind(target);
      }
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);
    const handleBlur = () => {
      setIsPressed(false);
      hide();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("blur", handleBlur);
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
    };
  }, [isTouchDevice, mouseX, mouseY]);

  useEffect(() => {
    const updateModalState = () => {
      setIsModalOpen(!!document.querySelector("dialog[open]"));
    };
    updateModalState();
    const observer = new MutationObserver(updateModalState);
    observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: ["open"] });
    return () => observer.disconnect();
  }, []);

  // globals.css only hides the native cursor while this class is present, so the user is never
  // left with no cursor at all — before the first mouse move, on touch, or while a modal dialog is open.
  useEffect(() => {
    const active = !isTouchDevice && isVisible && !isModalOpen;
    document.documentElement.classList.toggle("custom-cursor-on", active);
    return () => document.documentElement.classList.remove("custom-cursor-on");
  }, [isTouchDevice, isVisible, isModalOpen]);

  if (isTouchDevice || !isVisible || isModalOpen) return null;

  const ringTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: "tween" as const, duration: 0.25, ease: [0.25, 0.1, 0.25, 1] as const };
  const arrowTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: "tween" as const, duration: 0.2, ease: [0.25, 0.1, 0.25, 1] as const };
  // Hide arrow on text beam and link indicator so the ring badge becomes the primary pointer.
  const arrowHidden = cursorKind === "text";

  return (
    <div className={styles.layer} aria-hidden="true">
      {/* Outer Liquid Glass Halo Ring */}
      <motion.div
        data-kind={cursorKind}
        className={styles.ring}
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ ...RING[cursorKind], scale: isPressed ? 0.8 : 1 }}
        transition={ringTransition}
      >
        {cursorKind === "link" && (
          <motion.div
            initial={{ scale: 0, rotate: -45, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: -45, opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { type: "tween" as const, duration: 0.2, ease: [0.25, 0.1, 0.25, 1] as const }}
            className={styles.icon}
          >

          </motion.div>
        )}
        {cursorKind === "like" && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={styles.icon}
          >
            <Heart className="w-4.5 h-4.5 fill-white stroke-white" />
          </motion.div>
        )}
      </motion.div>

      {/* Sleek Custom Mouse Pointer Arrow Head at Exact Mouse Position */}
      <motion.div
        className={styles.pointer}
        style={{ x: mouseX, y: mouseY }}
        animate={{
          scale: arrowHidden ? 0 : isPressed ? 0.85 : 1,
          opacity: arrowHidden ? 0 : 1,
        }}
        transition={arrowTransition}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.arrow}
          style={{ marginLeft: -ARROW_TIP_OFFSET, marginTop: -ARROW_TIP_OFFSET }}
        >
          <path
            d="M3 3L10.07 19.97L13.58 13.58L19.97 10.07L3 3Z"
            fill="#355ba5"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </div>
  );
}
