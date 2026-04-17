"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

interface VideoPlayerProps {
  /** YouTube video ID (e.g. "EoXWVt3NjNI") or full YouTube URL */
  youtubeId?: string;
  /** Direct video file URL (fallback) */
  src?: string;
  poster?: string;
}

function extractYouTubeId(input: string): string {
  // Handle full URLs like https://www.youtube.com/watch?v=EoXWVt3NjNI
  const watchMatch = input.match(/[?&]v=([^&]+)/);
  if (watchMatch) return watchMatch[1];
  // Handle short URLs like https://youtu.be/EoXWVt3NjNI
  const shortMatch = input.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch) return shortMatch[1];
  // Already just an ID
  return input;
}

export function VideoPlayer({ youtubeId, src, poster }: VideoPlayerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeFullscreen = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeFullscreen();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, closeFullscreen]);

  const resolvedYouTubeId = youtubeId ? extractYouTubeId(youtubeId) : null;

  return (
    <>
      {/* Play button trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="group relative w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-gold/50 flex items-center justify-center transition-all duration-300 hover:border-gold hover:scale-110"
        aria-label="Play showreel"
      >
        <Play className="w-6 h-6 md:w-8 md:h-8 text-gold ml-1 transition-transform group-hover:scale-110" />
      </button>

      {/* Fullscreen popup overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-background-deep/95 backdrop-blur-sm flex items-center justify-center"
            onClick={closeFullscreen}
          >
            <button
              onClick={closeFullscreen}
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
              className="relative w-full max-w-5xl mx-4 aspect-video rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {resolvedYouTubeId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${resolvedYouTubeId}?autoplay=1&rel=0&modestbranding=1&color=white`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Showreel"
                />
              ) : src ? (
                <video
                  src={src}
                  poster={poster}
                  className="w-full h-full object-cover"
                  autoPlay
                  controls
                  playsInline
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-background-surface">
                  <p className="text-text-muted text-sm">No video available</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
