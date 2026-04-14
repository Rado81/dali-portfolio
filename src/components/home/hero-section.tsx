"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FilmGrain } from "@/components/ui/film-grain";
import { VideoPlayer } from "@/components/ui/video-player";
import { MagneticButton } from "@/components/ui/magnetic-button";

interface HeroSectionProps {
  name: string;
  title: string;
  showreelUrl?: string;
}

export function HeroSection({ name, title, showreelUrl }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-20%"]);

  function scrollToWork() {
    document.getElementById("featured-work")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Video/gradient background with parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        {showreelUrl ? (
          <video autoPlay muted loop playsInline className="w-full h-full object-cover" poster="/images/placeholder.jpg">
            <source src={showreelUrl} type="video/mp4" />
          </video>
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-background-elevated via-background-base to-background-deep" />
        )}
      </motion.div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 30%, #050505 100%)" }} />

      <FilmGrain />

      {/* Center content */}
      <motion.div style={{ opacity: textOpacity, y: textY }} className="relative z-20 text-center px-6">
        {showreelUrl ? (
          <div className="mb-8">
            <VideoPlayer src={showreelUrl} poster="/images/placeholder.jpg" />
          </div>
        ) : (
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-gold/50 flex items-center justify-center mx-auto mb-8">
            <div className="w-0 h-0 border-l-[16px] border-l-gold border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1" />
          </div>
        )}

        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl tracking-display uppercase text-text-primary">{name}</h1>
        <p className="text-text-muted text-[10px] md:text-xs tracking-label uppercase mt-3">{title}</p>

        <div className="flex gap-4 justify-center mt-10">
          <MagneticButton className="text-gold text-[10px] tracking-label uppercase border border-gold/30 px-6 py-3 rounded-sm hover:bg-gold/10 transition-colors">
            Watch Reel
          </MagneticButton>
          <MagneticButton onClick={scrollToWork} className="text-text-secondary text-[10px] tracking-label uppercase border border-text-subtle px-6 py-3 rounded-sm hover:border-text-muted transition-colors">
            View Work
          </MagneticButton>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="text-text-subtle text-[8px] tracking-label uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-px h-5 bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
}
