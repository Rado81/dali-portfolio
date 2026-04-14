import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { PageTransition } from "@/components/ui/page-transition";
import { FilmGrain } from "@/components/ui/film-grain";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { getProjectBySlug, getAllProjects } from "@/lib/content";

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return { title: `${project.meta.title} — Dali Sandic`, description: project.meta.description };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = getProjectBySlug(slug);
  if (!result) notFound();

  const { meta, content } = result;
  const allProjects = getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === meta.slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <PageTransition>
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <Image src={meta.heroImage} alt={meta.title} fill className="object-cover" priority />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 30%, #050505 100%)" }} />
        <FilmGrain />
        <div className="relative z-20 text-center">
          <p className="text-gold text-[9px] tracking-label uppercase mb-3">{meta.category.replace("-", " ")} &middot; {meta.year}</p>
          <h1 className="font-display text-4xl md:text-6xl tracking-display uppercase text-text-primary">{meta.title}</h1>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="grid md:grid-cols-[2fr_1fr] gap-12 md:gap-16">
          <ScrollReveal>
            <p className="text-text-muted text-[9px] tracking-label uppercase mb-4">Overview</p>
            <div className="prose prose-invert max-w-none text-text-secondary leading-relaxed">
              <MDXRemote source={content} />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-text-muted text-[9px] tracking-label uppercase mb-4">Credits</p>
            <div className="space-y-4">
              {[
                { label: "Role", value: meta.role },
                { label: "Director", value: meta.director },
                { label: "Camera", value: meta.camera },
                { label: "Format", value: meta.format },
                ...(meta.client ? [{ label: "Client", value: meta.client }] : []),
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-text-muted text-[9px] tracking-wide uppercase">{item.label}</p>
                  <p className="text-text-primary text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {meta.gallery.length > 0 && (
          <div className="mt-16">
            <p className="text-text-muted text-[9px] tracking-label uppercase mb-6">Stills</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {meta.gallery.map((img, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="relative aspect-[3/2] rounded overflow-hidden bg-background-elevated border border-gold-subtle/30">
                    <Image src={img} alt={`${meta.title} still ${i + 1}`} fill className="object-cover" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-gold-subtle">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-6 flex justify-between">
          {prevProject ? <Link href={`/work/${prevProject.slug}`} className="text-text-muted text-[9px] tracking-label uppercase hover:text-gold transition-colors">&larr; {prevProject.title}</Link> : <div />}
          {nextProject ? <Link href={`/work/${nextProject.slug}`} className="text-gold text-[9px] tracking-label uppercase hover:opacity-80 transition-opacity">{nextProject.title} &rarr;</Link> : <div />}
        </div>
      </div>
    </PageTransition>
  );
}
