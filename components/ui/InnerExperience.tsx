"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap, motion, ScrollTrigger } from "@/lib/gsap";
import { useLenis } from "@/hooks/useLenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Cursor } from "./Cursor";
export function InnerExperience(){
 const path=usePathname();const reduced=useReducedMotion();useLenis();
 useEffect(()=>{
  if(reduced)return;
  const root=document.getElementById('main');if(!root)return;
  const ctx=gsap.context(()=>{
   const intro=root.querySelector('.route-intro-layout');
   if(intro)gsap.from(intro.children,{y:20,opacity:0,duration:motion.normal,stagger:.1,ease:motion.ease});
   const sections=gsap.utils.toArray<HTMLElement>('.page-image-story, .bespoke-section, .inner-section, .service-faq, .service-related, .service-page-cta, .about-page-banner, .contact-page-layout, .blog-directory, .project-gallery, .blog-article > section',root);
   sections.forEach(section=>gsap.from(section,{y:28,opacity:0,duration:motion.slow,ease:motion.ease,scrollTrigger:{trigger:section,start:'top 94%',once:true}}));
  },root);
  let cancelled=false;document.fonts.ready.then(()=>{if(!cancelled)ScrollTrigger.refresh();});
  return()=>{cancelled=true;ctx.revert();};
 },[path,reduced]);
 return <><div className="ambient-mesh" aria-hidden="true"/><Cursor/></>;
}
