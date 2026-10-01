import Image from "next/image";
import { innerPageImages } from "@/lib/config";

export function PageImage({ imageKey, compact = false }: { imageKey: keyof typeof innerPageImages; compact?: boolean }) {
  const image = innerPageImages[imageKey];
  return <figure id="page-visual" className={`page-image-story ${compact ? "page-image-compact" : "section-container"}`}>
    <div className="page-image-frame"><Image src={image.src} alt={image.alt} fill sizes={compact ? "(max-width: 767px) 100vw, 70vw" : "(max-width: 767px) 100vw, 90vw"}/></div>
    <figcaption><div><h2>{image.title}</h2><p>{image.caption}</p></div><small>Illustrative imagery · AI-created</small></figcaption>
  </figure>;
}
