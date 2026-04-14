import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type { JournalPost } from "@/lib/types";

export function JournalCard({ post, delay = 0 }: { post: JournalPost; delay?: number }) {
  return (
    <ScrollReveal delay={delay}>
      <Link href={`/journal/${post.slug}`} className="group block">
        <div className="relative aspect-[16/10] rounded overflow-hidden border border-transparent group-hover:border-gold/30 transition-colors mb-4 bg-background-elevated">
          <Image src={post.featuredImage} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
        <p className="text-gold text-[8px] tracking-label uppercase mb-2">{post.category} &middot; {post.readingTime}</p>
        <h3 className="text-text-primary text-base tracking-wide mb-2 group-hover:text-gold transition-colors">{post.title}</h3>
        <p className="text-text-muted text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
        <p className="text-text-subtle text-xs mt-3">{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
      </Link>
    </ScrollReveal>
  );
}
