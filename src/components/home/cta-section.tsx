import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { FilmGrain } from "@/components/ui/film-grain";

export function CTASection() {
  return (
    <section className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(212,175,55,0.05) 0%, transparent 70%)" }} />
      <FilmGrain />
      <div className="relative z-20 text-center px-6">
        <ScrollReveal>
          <p className="text-text-muted text-[9px] tracking-label uppercase mb-4">Let&apos;s Create Together</p>
          <h2 className="text-text-primary text-3xl md:text-5xl tracking-wide font-light uppercase">Ready to Tell</h2>
          <h2 className="text-gold text-3xl md:text-5xl tracking-wide font-light uppercase mb-10">Your Story?</h2>
          <MagneticButton as="a" href="/contact" className="inline-block text-background-deep text-[11px] tracking-label uppercase bg-gold px-8 py-4 rounded-sm hover:bg-gold-dark transition-colors">
            Get in Touch
          </MagneticButton>
        </ScrollReveal>
      </div>
    </section>
  );
}
