"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { Play, X } from "lucide-react";
import { FilmGrain } from "@/components/ui/film-grain";
import { MagneticButton } from "@/components/ui/magnetic-button";

interface HeroSectionProps {
  name: string;
  title: string;
  youtubeId?: string;
  reelYoutubeId?: string;
  showreelUrl?: string;
}

export function HeroSection({ name, title, youtubeId, reelYoutubeId, showreelUrl }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-20%"]);

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<string | undefined>(undefined);

  const openVideo = useCallback((id?: string) => {
    setActiveVideoId(id);
    setIsVideoOpen(true);
  }, []);
  const closeVideo = useCallback(() => {
    setIsVideoOpen(false);
    setActiveVideoId(undefined);
  }, []);

  useEffect(() => {
    if (!isVideoOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeVideo();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isVideoOpen, closeVideo]);

  function scrollToWork() {
    document.getElementById("featured-work")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Video/gradient background with parallax */}
        <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
          {showreelUrl ? (
            <video autoPlay muted loop playsInline className="w-full h-full object-cover" poster="/images/placeholder.jpg">
              <source src={showreelUrl} type="video/mp4" />
            </video>
          ) : (
            <div className="w-full h-full hero-gradient" />
          )}
        </motion.div>

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 30%, #050505 100%)" }} />

        <FilmGrain />

        {/* Center content */}
        <motion.div style={{ opacity: textOpacity, y: textY }} className="relative z-20 text-center px-6 flex flex-col items-center">
          {/* Play circle button */}
          <button
            onClick={() => openVideo(youtubeId)}
            className="group relative w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-gold/50 flex items-center justify-center transition-all duration-300 hover:border-gold hover:scale-110 mb-8"
            aria-label="Play showreel"
          >
            <Play className="w-6 h-6 md:w-8 md:h-8 text-gold ml-1 transition-transform group-hover:scale-110" />
          </button>

          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl tracking-display uppercase text-text-primary">{name}</h1>
          <p className="text-text-muted text-[10px] md:text-xs tracking-label uppercase mt-3">{title}</p>

          <div className="flex gap-4 justify-center mt-10">
            <MagneticButton
              onClick={() => openVideo(reelYoutubeId)}
              className="text-gold text-[10px] tracking-label uppercase border border-gold/30 px-6 py-3 rounded-sm hover:bg-gold/10 transition-colors"
            >
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

      {/* YouTube video popup */}
      <AnimatePresence>
        {isVideoOpen && activeVideoId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-background-deep/95 backdrop-blur-sm flex items-center justify-center"
            onClick={closeVideo}
          >
            <button
              onClick={closeVideo}
              className="absolute top-6 right-6 text-text-muted hover:text-text-primary transition-colors z-10"
              aria-label="Close video"
            >
              <X className="w-8 h-8" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.9, 0.3, 1] }}
              className="relative w-full max-w-[90vw] max-h-[85vh] aspect-video rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0&modestbranding=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Showreel"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
