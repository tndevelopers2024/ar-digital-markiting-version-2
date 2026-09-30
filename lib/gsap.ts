"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("ar-ease", "0.16,1,0.3,1");
export const motion = { ease: "ar-ease", fast: 0.32, normal: 0.64, slow: 1.12 } as const;
export { gsap, ScrollTrigger };
