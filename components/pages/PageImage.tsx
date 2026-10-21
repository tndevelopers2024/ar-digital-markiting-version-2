import Image from "next/image";
import { innerPageImages } from "@/lib/config";

export function PageImage({ imageKey, compact = false }: { imageKey: keyof typeof innerPageImages; compact?: boolean }) {
  const image = innerPageImages[imageKey];
  return <figure id="page-visual" className={`page-image-story ${compact ? "page-image-compact" : "section-container"}`}>
    <div className="page-image-frame"><Image src={image.src} alt={image.alt} fill loading={compact ? "lazy" : "eager"} fetchPriority={compact ? "auto" : "high"} sizes={compact ? "(max-width: 767px) calc(100vw - 56px), 70vw" : "(max-width: 767px) calc(100vw - 56px), (max-width: 1100px) calc(100vw - 80px), min(90vw, 1376px)"}/></div>
    <figcaption><div><h2>{image.title}</h2><p>{image.caption}</p></div></figcaption>
  </figure>;
}
