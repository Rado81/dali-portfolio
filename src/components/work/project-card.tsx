"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.4 }} className={featured ? "col-span-full" : ""}>
      <Link href={`/work/${project.slug}`} className="group block">
        <div className={`relative overflow-hidden rounded border border-transparent group-hover:border-gold/30 transition-colors duration-300 bg-background-elevated ${featured ? "aspect-[21/9]" : "aspect-[4/3]"}`}>
          <Image src={project.thumbnail} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-background-deep/90 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
            <p className="text-gold text-[8px] md:text-[9px] tracking-label uppercase mb-1">{project.category.replace("-", " ")} &middot; {project.year}</p>
            <h3 className={`text-text-primary tracking-wide ${featured ? "text-lg md:text-xl" : "text-sm md:text-base"}`}>{project.title}</h3>
            <p className="text-text-muted text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{project.role}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
