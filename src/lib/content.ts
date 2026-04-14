import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Project, Testimonial, Service, SiteConfig, JournalPost } from "./types";

const contentDir = path.join(process.cwd(), "content");

export function getSiteConfig(): SiteConfig {
  const raw = fs.readFileSync(path.join(contentDir, "site.json"), "utf-8");
  return JSON.parse(raw);
}

export function getTestimonials(): Testimonial[] {
  const raw = fs.readFileSync(path.join(contentDir, "testimonials.json"), "utf-8");
  return JSON.parse(raw);
}

export function getServices(): Service[] {
  const raw = fs.readFileSync(path.join(contentDir, "services.json"), "utf-8");
  return JSON.parse(raw);
}

export function getAbout() {
  const raw = fs.readFileSync(path.join(contentDir, "about.json"), "utf-8");
  return JSON.parse(raw);
}

export function getAllProjects(): Project[] {
  const projectsDir = path.join(contentDir, "projects");
  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".mdx"));

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(projectsDir, file), "utf-8");
    const { data } = matter(raw);
    return data as Project;
  });
}

export function getProjectBySlug(slug: string): { meta: Project; content: string } | null {
  const filePath = path.join(contentDir, "projects", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { meta: data as Project, content };
}

export function getAllJournalPosts(): JournalPost[] {
  const journalDir = path.join(contentDir, "journal");
  const files = fs.readdirSync(journalDir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(journalDir, file), "utf-8");
      const { data } = matter(raw);
      return data as JournalPost;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getJournalPostBySlug(slug: string): { meta: JournalPost; content: string } | null {
  const journalDir = path.join(contentDir, "journal");
  const files = fs.readdirSync(journalDir).filter((f) => f.endsWith(".mdx"));

  for (const file of files) {
    const raw = fs.readFileSync(path.join(journalDir, file), "utf-8");
    const { data, content } = matter(raw);
    if (data.slug === slug) return { meta: data as JournalPost, content };
  }
  return null;
}
