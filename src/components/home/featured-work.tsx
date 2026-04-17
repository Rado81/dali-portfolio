"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { videos, type VideoItem } from "@/lib/videos";

const PER_PAGE_DESKTOP = 3;

export function FeaturedWork() {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(videos.length / PER_PAGE_DESKTOP);

  function nextPage() {
    setPage((prev) => (prev + 1) % totalPages);
  }

  function prevPage() {
    setPage((prev) => (prev - 1 + totalPages) % totalPages);
  }

  // Auto-advance every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setPage((prev) => (prev + 1) % totalPages);
    }, 6000);
    return () => clearInterval(timer);
  }, [totalPages]);

  // Close video on Escape
  const closeVideo = useCallback(() => setActiveVideo(null), []);
  useEffect(() => {
    if (!activeVideo) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeVideo();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeVideo, closeVideo]);

  // Get the 3 videos for the current page
  const startIdx = page * PER_PAGE_DESKTOP;
  const visibleVideos = videos.slice(startIdx, startIdx + PER_PAGE_DESKTOP);

  return (
    <>
      <section id="featured-work" className="py-20 md:py-32 bg-background-base">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="flex items-end justify-between mb-12">
            <SectionHeading label="Selected" title="Featured Work" />
            <ScrollReveal>
              <Link href="/work" className="text-gold text-[10px] tracking-label uppercase hover:opacity-80 transition-opacity">
                View All &rarr;
              </Link>
            </ScrollReveal>
          </div>

          {/* Slideshow — 3 cards with animated page transitions */}
          <div className="relative">
            {/* Arrow buttons overlaid on sides */}
            <button
              onClick={prevPage}
              className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-gold-subtle bg-background-base/80 backdrop-blur-sm items-center justify-center text-text-muted hover:text-gold hover:border-gold/30 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextPage}
              className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-gold-subtle bg-background-base/80 backdrop-blur-sm items-center justify-center text-text-muted hover:text-gold hover:border-gold/30 transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Cards grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: [0.25, 0.9, 0.3, 1] }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {visibleVideos.map((video) => (
                  <button
                    key={video.youtubeId}
                    onClick={() => setActiveVideo(video)}
                    className="group block w-full text-left"
                  >
                    <div className="relative aspect-video rounded-lg overflow-hidden border border-gold-subtle bg-background-elevated">
                      <Image
                        src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                        alt={video.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        unoptimized
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-background-deep/10 group-hover:bg-background-deep/40 transition-colors duration-300">
                        <div className="w-14 h-14 rounded-full border-2 border-gold/50 flex items-center justify-center bg-background-deep/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                          <Play className="w-6 h-6 text-gold ml-0.5" />
                        </div>
                      </div>
                    </div>
                    <h3 className="text-text-primary text-sm tracking-wide mt-3 group-hover:text-gold transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-text-muted text-[9px] tracking-label uppercase mt-1">
                      {video.category}
                    </p>
                  </button>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Page dots */}
          <div className="flex justify-center gap-3 mt-10">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === page
                    ? "w-10 h-3 bg-gold"
                    : "w-3 h-3 bg-text-subtle hover:bg-text-muted"
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Video popup modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-background-deep/95 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setActiveVideo(null)}
          >
            <button
              onClick={() => setActiveVideo(null)}
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
              className="relative w-full max-w-[90vw] max-h-[85vh] mx-4 aspect-video rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={activeVideo.title}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
