"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Project } from "@/lib/types";

interface FeaturedWorkProps {
  projects: Project[];
}

export function FeaturedWork({ projects }: FeaturedWorkProps) {
  return (
    <section id="featured-work" className="py-20 md:py-32 bg-background-base">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between mb-12">
          <SectionHeading label="Selected" title="Featured Work" />
          <ScrollReveal>
            <Link href="/work" className="text-gold text-[10px] tracking-label uppercase hover:opacity-80 transition-opacity">View All &rarr;</Link>
          </ScrollReveal>
        </div>
      </div>

      <div className="flex gap-5 overflow-x-auto px-6 md:px-10 pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: "none" }}>
        {projects.map((project, i) => (
          <motion.div key={project.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }} className="flex-shrink-0 w-[300px] md:w-[400px] snap-start">
            <Link href={`/work/${project.slug}`} className="group block">
              <div className="relative aspect-[16/10] rounded overflow-hidden border border-gold-subtle mb-3 bg-background-elevated">
                <Image src={project.thumbnail} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full border border-gold/50 flex items-center justify-center bg-background-deep/50 backdrop-blur-sm">
                    <div className="w-0 h-0 border-l-[10px] border-l-gold border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1" />
                  </div>
                </div>
              </div>
              <h3 className="text-text-primary text-sm tracking-wide">{project.title}</h3>
              <p className="text-text-muted text-[9px] tracking-label uppercase mt-1">{project.category.replace("-", " ")} &middot; {project.year}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
