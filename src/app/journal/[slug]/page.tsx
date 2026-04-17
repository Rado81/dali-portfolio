import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { PageTransition } from "@/components/ui/page-transition";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { FilmGrain } from "@/components/ui/film-grain";
import { getJournalPostBySlug, getAllJournalPosts } from "@/lib/content";

export function generateStaticParams() {
  return getAllJournalPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getJournalPostBySlug(slug);
  if (!post) return {};
  return { title: `${post.meta.title} — Dali Sandic`, description: post.meta.excerpt };
}

export default async function JournalPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = getJournalPostBySlug(slug);
  if (!result) notFound();
  const { meta, content } = result;

  return (
    <PageTransition>
      <section className="relative pt-32 pb-16 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background-elevated to-background-deep" />
        <FilmGrain />
        <div className="relative z-20 text-center px-6">
          <p className="text-gold text-[9px] tracking-label uppercase mb-3">{meta.category} &middot; {meta.readingTime}</p>
          <h1 className="font-display text-3xl md:text-5xl tracking-display uppercase text-text-primary max-w-3xl mx-auto">{meta.title}</h1>
          <p className="text-text-muted text-xs mt-4">{new Date(meta.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
      </section>
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <ScrollReveal>
          <article className="prose prose-invert max-w-none text-text-secondary prose-headings:text-text-primary prose-headings:font-light prose-headings:tracking-wide prose-headings:uppercase prose-a:text-gold">
            <MDXRemote source={content} />
          </article>
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}
