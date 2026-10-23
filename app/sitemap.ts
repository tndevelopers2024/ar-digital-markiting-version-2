import type { MetadataRoute } from "next";
import { config, servicePages } from "@/lib/config";
import { blogPosts } from "@/lib/blog-data";
import { site } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
 if (!site.indexable) return [];
 const paths=["", "/about", "/services", "/portfolio", "/projects", "/team", "/blogs", "/contact", "/privacy-policy", "/terms-and-conditions", ...servicePages.map(s=>`/services/${s.slug}`), ...blogPosts.map(post=>`/blogs/${post.slug}`), ...config.work.projects.map(p=>`/projects/${p.id}`)];
 return paths.map(path=>({url:`${site.url}${path}`,changeFrequency:"monthly",priority:path?0.7:1}));
}
