import Image from "next/image";
import Link from "next/link";
import { blogSlugs, config, homeImages } from "@/lib/config";
import { Section } from "@/components/ui/Section";
export function Insights() {
 const data=config.insights;
 const photos=[homeImages.blogConversion, homeImages.branding, homeImages.analytics];
 return <Section id="insights" className="insights section-container batch-section"><div className="section-heading" data-reveal><div><h2 id="insights-heading">Latest <span>Blogs</span></h2><p className="section-description">Practical ideas for your brand, website, and digital marketing.<br className="description-break"/>{" "}Explore useful tips to help you take your next step.</p></div></div><div className="insights-grid">{data.items.map((item,i)=><article className="insight-card" key={item.title} data-reveal><div className="insight-art home-blog-photo"><Image {...photos[i]} alt={photos[i].alt} fill sizes="(max-width: 767px) 100vw, 30vw"/></div><div className="insight-copy"><p className="insight-meta"><span>{item.category}</span><span>{item.minutes}</span></p><h3>{item.title}</h3><p>{item.summary}</p><Link className="blog-read-link" href={`/blogs/${blogSlugs[i]}`}>Read blog</Link></div></article>)}</div><Link className="all-services-link" href="/blogs">View all blogs</Link></Section>;
}
