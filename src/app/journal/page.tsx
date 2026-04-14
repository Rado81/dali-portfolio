import { PageTransition } from "@/components/ui/page-transition";
import { JournalCard } from "@/components/journal/journal-card";
import { FilmGrain } from "@/components/ui/film-grain";
import { getAllJournalPosts } from "@/lib/content";

export const metadata = { title: "Journal — Dali Sandic", description: "Behind the scenes, gear reviews, and industry insights." };

export default function JournalPage() {
  const posts = getAllJournalPosts();
  return (
    <PageTransition>
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background-elevated to-background-deep" />
        <FilmGrain />
        <div className="relative z-20 text-center">
          <p className="text-text-muted text-[9px] tracking-label uppercase mb-3">Blog</p>
          <h1 className="font-display text-4xl md:text-6xl tracking-display uppercase text-text-primary">Journal</h1>
        </div>
      </section>
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post, i) => (<JournalCard key={post.slug} post={post} delay={i * 0.1} />))}
        </div>
        {posts.length === 0 && <p className="text-text-muted text-center text-sm">No posts yet. Check back soon.</p>}
      </div>
    </PageTransition>
  );
}
