import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function AboutTeaser({ bio }: { bio: string }) {
  return (
    <section className="py-20 md:py-32 bg-background-base">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
          <ScrollReveal direction="left" className="flex-shrink-0">
            <div className="relative w-48 h-60 md:w-64 md:h-80 rounded overflow-hidden border border-gold-subtle bg-background-elevated">
              <Image src="/images/dali-profile.jpg" alt="Dali Sandic" fill sizes="(max-width: 768px) 192px, 256px" className="object-cover" />
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <p className="text-text-muted text-[9px] tracking-label uppercase mb-3">About</p>
            <h2 className="text-text-primary text-2xl md:text-3xl tracking-wide font-light uppercase mb-6">The Eye Behind the Lens</h2>
            <p className="text-text-secondary text-base leading-relaxed mb-6 max-w-lg">{bio}</p>
            <Link href="/about" className="text-gold text-[10px] tracking-label uppercase hover:opacity-80 transition-opacity">Read More &rarr;</Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
