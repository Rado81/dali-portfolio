"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize, X } from "lucide-react";

interface VideoPlayerProps {
  src: string;
  poster?: string;
}

export function VideoPlayer({ src, poster }: VideoPlayerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function togglePlay() {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }

  function openFullscreen() {
    setIsOpen(true);
  }

  function closeFullscreen() {
    setIsOpen(false);
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }

  return (
    <>
      <button onClick={openFullscreen} className="group relative w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-gold/50 flex items-center justify-center transition-all duration-300 hover:border-gold hover:scale-110" aria-label="Play showreel">
        <Play className="w-6 h-6 md:w-8 md:h-8 text-gold ml-1 transition-transform group-hover:scale-110" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="fixed inset-0 z-50 bg-background-deep/95 flex items-center justify-center">
            <button onClick={closeFullscreen} className="absolute top-6 right-6 text-text-muted hover:text-text-primary transition-colors z-10" aria-label="Close video">
              <X className="w-8 h-8" />
            </button>
            <div className="relative w-full max-w-5xl mx-4 aspect-video">
              <video ref={videoRef} src={src} poster={poster} className="w-full h-full rounded-lg" onClick={togglePlay} autoPlay playsInline />
              <div className="absolute bottom-0 left-0 right-0 flex items-center gap-4 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                <button onClick={togglePlay} className="text-white hover:text-gold transition-colors">
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <button onClick={() => { if (videoRef.current) { videoRef.current.muted = !videoRef.current.muted; setIsMuted(!isMuted); } }} className="text-white hover:text-gold transition-colors">
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <button onClick={() => videoRef.current?.requestFullscreen()} className="text-white hover:text-gold transition-colors ml-auto">
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
