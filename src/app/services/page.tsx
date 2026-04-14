import { Camera, Palette, Clapperboard, Lightbulb } from "lucide-react";
import { PageTransition } from "@/components/ui/page-transition";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import { FilmGrain } from "@/components/ui/film-grain";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { getServices } from "@/lib/content";
import type { Service } from "@/lib/types";

export const metadata = { title: "Services — Dali Sandic", description: "Cinematography, color grading, directing, and visual consulting services." };

const iconMap: Record<string, React.ReactNode> = {
  Camera: <Camera className="w-8 h-8 text-gold" />,
  Palette: <Palette className="w-8 h-8 text-gold" />,
  Clapperboard: <Clapperboard className="w-8 h-8 text-gold" />,
  Lightbulb: <Lightbulb className="w-8 h-8 text-gold" />,
};

const processSteps = [
  { step: "01", title: "Discovery", description: "Understanding your vision, story, and creative goals" },
  { step: "02", title: "Pre-production", description: "Shot design, location scouting, and visual planning" },
  { step: "03", title: "Production", description: "On-set cinematography and visual direction" },
  { step: "04", title: "Delivery", description: "Color grading, final output, and archive delivery" },
];

export default function ServicesPage() {
  const services = getServices();
  return (
    <PageTransition>
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background-elevated to-background-deep" />
        <FilmGrain />
        <div className="relative z-20 text-center">
          <p className="text-text-muted text-[9px] tracking-label uppercase mb-3">Services</p>
          <h1 className="font-display text-4xl md:text-6xl tracking-display uppercase text-text-primary">What I Do</h1>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <StaggerContainer className="grid md:grid-cols-2 gap-5 mb-24">
          {services.map((service: Service) => (
            <StaggerItem key={service.id}>
              <div className="border border-gold-subtle rounded p-6 md:p-8 bg-background-surface hover:border-gold/30 transition-colors group">
                <div className="mb-4">{iconMap[service.icon]}</div>
                <h3 className="text-text-primary text-lg tracking-wide uppercase mb-3">{service.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{service.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal className="mb-24">
          <p className="text-text-muted text-[9px] tracking-label uppercase mb-8 text-center">How I Work</p>
          <div className="grid md:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 0.15}>
                <div className="text-center">
                  <p className="text-gold text-3xl font-light mb-3">{step.step}</p>
                  <p className="text-text-primary text-sm tracking-wide uppercase mb-2">{step.title}</p>
                  <p className="text-text-muted text-xs leading-relaxed">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal className="text-center">
          <h2 className="text-text-primary text-2xl tracking-wide font-light uppercase mb-4">Let&apos;s Discuss Your Project</h2>
          <MagneticButton as="a" href="/contact" className="inline-block text-background-deep text-[11px] tracking-label uppercase bg-gold px-8 py-4 rounded-sm hover:bg-gold-dark transition-colors">Get in Touch</MagneticButton>
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}
