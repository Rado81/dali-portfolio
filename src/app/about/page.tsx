import Image from "next/image";
import { PageTransition } from "@/components/ui/page-transition";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import { FilmGrain } from "@/components/ui/film-grain";
import { getAbout } from "@/lib/content";

export const metadata = { title: "About — Dali Sandic", description: "Learn about Dali Sandic, cinematographer and visual storyteller." };

export default function AboutPage() {
  const about = getAbout();

  return (
    <PageTransition>
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background-elevated to-background-deep" />
        <FilmGrain />
        <div className="relative z-20 text-center">
          <p className="text-text-muted text-[9px] tracking-label uppercase mb-3">About</p>
          <h1 className="font-display text-4xl md:text-6xl tracking-display uppercase text-text-primary">Dali Sandic</h1>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 md:px-10 py-16 md:py-24">
        {/* Bio */}
        <ScrollReveal className="mb-20">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="flex-shrink-0 w-48 h-64 md:w-56 md:h-72 relative rounded overflow-hidden border border-gold-subtle bg-background-elevated">
              <Image src="/images/placeholder.jpg" alt="Dali Sandic" fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-text-primary text-xl tracking-wide font-light uppercase mb-6">The Eye Behind the Lens</h2>
              <p className="text-text-secondary leading-relaxed mb-4">{about.bio}</p>
              <p className="text-text-secondary leading-relaxed">{about.longBio}</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="mb-20">
          <ScrollReveal><p className="text-text-muted text-[9px] tracking-label uppercase mb-8">Journey</p></ScrollReveal>
          <div className="space-y-8 border-l border-gold-subtle pl-8 ml-4">
            {about.timeline.map((item: { year: number; title: string; description: string }, i: number) => (
              <ScrollReveal key={item.year} delay={i * 0.1}>
                <div className="relative">
                  <div className="absolute -left-[37px] top-1 w-2.5 h-2.5 rounded-full bg-gold border-2 border-background-deep" />
                  <p className="text-gold text-sm tracking-wide mb-1">{item.year}</p>
                  <p className="text-text-primary text-base mb-1">{item.title}</p>
                  <p className="text-text-muted text-sm">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Equipment */}
        <ScrollReveal className="mb-20">
          <p className="text-text-muted text-[9px] tracking-label uppercase mb-6">Equipment & Tools</p>
          <div className="flex flex-wrap gap-3">
            {about.equipment.map((item: string) => (
              <span key={item} className="text-sm text-gold border border-gold-subtle px-4 py-2 rounded-sm bg-gold-subtle">{item}</span>
            ))}
          </div>
        </ScrollReveal>

        {/* Awards */}
        <ScrollReveal>
          <p className="text-text-muted text-[9px] tracking-label uppercase mb-6">Recognition</p>
          <StaggerContainer className="grid md:grid-cols-3 gap-4">
            {about.awards.map((award: { year: number; title: string; event: string }) => (
              <StaggerItem key={award.title}>
                <div className="border border-gold-subtle rounded p-5 bg-background-surface">
                  <p className="text-gold text-sm mb-2">{award.year}</p>
                  <p className="text-text-primary text-base mb-1">{award.title}</p>
                  <p className="text-text-muted text-xs">{award.event}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}
