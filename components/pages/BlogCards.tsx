import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";

export function BlogCards({ exclude, showImages = true, limit }: { exclude?: string; showImages?: boolean; limit?: number }) {
  const posts = blogPosts.filter(post => post.slug !== exclude).slice(0, limit);
  return <div className="blog-list-grid">{posts.map(post => <article key={post.slug}>
    <Link data-cursor="Read" href={`/blogs/${post.slug}`}>
      {showImages && !exclude && <div className="listing-photo blog-listing-photo">
        <Image src={post.card.src} alt={post.card.alt} fill sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 33vw" />
      </div>}
      <div className="blog-card-copy">
        <p className="insight-meta"><span>{post.category}</span><span>{post.minutes}</span></p>
        <h2>{post.title}</h2><p>{post.summary}</p><span className="inner-text-link">Read blog</span>
      </div>
    </Link>
  </article>)}</div>;
}
