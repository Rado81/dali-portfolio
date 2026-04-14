"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Testimonial } from "@/lib/types";

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return;
    const timer = setInterval(() => { setCurrent((prev) => (prev + 1) % testimonials.length); }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, testimonials.length]);

  const t = testimonials[current];

  return (
    <section className="py-20 md:py-32 bg-background-base">
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        <SectionHeading label="What They Say" title="Testimonials" align="center" className="mb-16" />
        <div className="relative min-h-[200px]" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
          <AnimatePresence mode="wait">
            <motion.div key={current} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }} className="text-center">
              <p className="text-gold text-5xl leading-none mb-6">&ldquo;</p>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed italic mb-8 max-w-xl mx-auto">{t.quote}</p>
              <p className="text-text-primary text-sm tracking-wide">{t.name}</p>
              <p className="text-text-muted text-xs mt-1">{t.role}, {t.company}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex gap-2 justify-center mt-8">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-gold" : "bg-text-subtle"}`} aria-label={`Go to testimonial ${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
