"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectCard } from "./project-card";
import type { Project } from "@/lib/types";

const categories = [
  { value: "all", label: "All" },
  { value: "narrative", label: "Narrative" },
  { value: "commercial", label: "Commercial" },
  { value: "music-video", label: "Music Video" },
  { value: "documentary", label: "Documentary" },
];

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <div className="flex gap-3 justify-center flex-wrap mb-12">
        {categories.map((cat) => (
          <button key={cat.value} onClick={() => setFilter(cat.value)} className={`text-[9px] tracking-label uppercase px-4 py-2 rounded-sm transition-colors ${filter === cat.value ? "bg-gold text-background-deep" : "border border-text-subtle text-text-muted hover:border-text-muted"}`}>
            {cat.label}
          </button>
        ))}
      </div>
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <ProjectCard key={project.slug} project={project} featured={i === 0 && filter === "all"} />
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
