"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import React, { useRef, useState, useEffect } from "react";

export interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

export interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

export interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
  activeHref?: string;
  renderItem?: (item: { name: string; link: string }, idx: number, hovered: boolean) => React.ReactNode;
}

export interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

export interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 40);
  });

  return (
    <motion.div
      ref={ref}
      className={cn("fixed inset-x-0 top-0 z-50 w-full pointer-events-none", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(16px)" : "blur(0px)",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.08), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.8)"
          : "none",
        width: visible ? "68%" : "100%",
        y: visible ? 18 : 0,
        paddingTop: visible ? "10px" : "18px",
        paddingBottom: visible ? "10px" : "18px",
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 38,
      }}
      style={{
        minWidth: visible ? "min(100%, 820px)" : "100%",
      }}
      className={cn(
        "pointer-events-auto relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-8 lg:flex transition-colors duration-300",
        visible && "bg-white/95 border border-black/5",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({
  items,
  className,
  onItemClick,
  activeHref,
  renderItem,
}: NavItemsProps) => {

  return (
    <motion.div
      className={cn(
        "relative flex flex-row items-center justify-center space-x-1 text-sm font-medium text-neutral-600",
        className,
      )}
    >
      {items.map((item, idx) => {
        if (renderItem) {
          return (
            <div
              key={`link-${idx}`}
              className="relative"
            >
              {renderItem(item, idx, false)}
            </div>
          );
        }

        const isActive = activeHref === item.link;
        return (
          <a
            onClick={onItemClick}
            className={cn(
              "relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full",
              isActive
                ? "text-neutral-900 font-semibold"
                : "text-neutral-600 ",
            )}
            key={`link-${idx}`}
            href={item.link}
          >
            <span className="relative z-20">{item.name}</span>
          </a>
        );
      })}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(16px)" : "blur(0px)",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.08), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.8)"
          : "none",
        width: visible ? "92%" : "100%",
        paddingRight: visible ? "16px" : "20px",
        paddingLeft: visible ? "16px" : "20px",
        borderRadius: visible ? "999px" : "0px",
        y: visible ? 12 : 0,
        paddingTop: visible ? "10px" : "14px",
        paddingBottom: visible ? "10px" : "14px",
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 38,
      }}
      className={cn(
        "pointer-events-auto relative z-50 mx-auto flex w-full max-w-[calc(100vw-1.5rem)] flex-col items-center justify-between bg-transparent px-4 py-3 lg:hidden transition-colors duration-300",
        visible && "bg-white/95 border border-black/5",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="mobile-navigation-menu"
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={cn(
            "absolute inset-x-0 top-[calc(100%+8px)] z-50 flex w-full max-h-[calc(100dvh-110px)] overflow-y-auto overscroll-contain flex-col items-start justify-start gap-4 rounded-3xl bg-white/95 p-6 shadow-2xl border border-neutral-200/80 backdrop-blur-2xl",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-navigation-menu"
      className="p-2 min-h-11 min-w-11 rounded-full text-neutral-800  transition-colors  flex items-center justify-center cursor-pointer"
    >
      {isOpen ? (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      ) : (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      )}
    </button>
  );
};

export const NavbarLogo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
    >
      <span className="flex size-7 items-center justify-center rounded-lg bg-neutral-900 text-white font-bold text-xs">
        AR
      </span>
      <span className="font-medium text-black">AR Digital</span>
    </Link>
  );
};

export interface NavbarButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
  onClick?: () => void;
}

export const NavbarButton = ({
  href,
  children,
  className,
  variant = "primary",
  onClick,
  style,
  ...props
}: NavbarButtonProps) => {
  const isLightText = variant === "primary" || variant === "dark" || variant === "gradient";

  const baseStyles =
    "px-5 py-2.5 rounded-full text-sm font-semibold relative cursor-pointer  transition duration-200 inline-flex items-center justify-center gap-2 text-center";

  const variantStyles = {
    primary:
      "bg-[#245ba7] !text-white text-white  shadow-[0_4px_14px_rgba(36,91,167,0.25)]",
    secondary:
      "bg-transparent text-neutral-700 ",
    dark: "bg-black !text-white text-white shadow-[0_2px_10px_rgba(0,0,0,0.2)]",
    gradient:
      "bg-gradient-to-r from-[#245ba7] to-[#d62832] !text-white text-white shadow-[0_4px_14px_rgba(36,91,167,0.25)]",
  };

  const combinedClass = cn(baseStyles, variantStyles[variant], className);
  const combinedStyle: React.CSSProperties = {
    ...(isLightText ? { color: "#ffffff" } : {}),
    ...style,
  };

  if (href) {
    return (
      <a
        href={href}
        className={combinedClass}
        onClick={onClick}
        style={combinedStyle}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={combinedClass}
      onClick={onClick}
      style={combinedStyle}
    >
      {children}
    </button>
  );
};
