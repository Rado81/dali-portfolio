"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { videos, type VideoItem } from "@/lib/videos";

const categories = [
  { value: "all", label: "All" },
  { value: "Showreel", label: "Showreel" },
  { value: "Commercial", label: "Commercial" },
  { value: "Narrative", label: "Narrative" },
  { value: "Aerial", label: "Aerial" },
];

export function VideoGrid() {
  const [filter, setFilter] = useState("all");
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const filtered = filter === "all" ? videos : videos.filter((v) => v.category === filter);

  const closeVideo = useCallback(() => setActiveVideo(null), []);
  useEffect(() => {
    if (!activeVideo) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeVideo();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeVideo, closeVideo]);

  return (
    <>
      {/* Category filters */}
      <div className="flex gap-3 justify-center flex-wrap mb-12">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setFilter(cat.value)}
            className={`text-[9px] tracking-label uppercase px-4 py-2 rounded-sm transition-colors ${
              filter === cat.value
                ? "bg-gold text-background-deep"
                : "border border-text-subtle text-text-muted hover:border-text-muted"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Video grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((video, i) => (
            <motion.div
              key={video.youtubeId}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <button
                onClick={() => setActiveVideo(video)}
                className="group block w-full text-left"
              >
                <div className="relative aspect-video rounded-lg overflow-hidden border border-gold-subtle bg-background-elevated">
                  <Image
                    src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    alt={video.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                    loading="eager"
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
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

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
