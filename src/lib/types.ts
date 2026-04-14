export interface Project {
  slug: string;
  title: string;
  category: "narrative" | "commercial" | "music-video" | "documentary";
  year: number;
  role: string;
  director: string;
  camera: string;
  format: string;
  client?: string;
  description: string;
  thumbnail: string;
  heroImage: string;
  videoUrl?: string;
  gallery: string[];
  featured: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  location: string;
  availability: string;
  social: {
    instagram: string;
    vimeo: string;
    linkedin: string;
  };
  stats: {
    projects: number;
    years: number;
    clients: number;
    awards: number;
  };
}

export interface JournalPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: "bts" | "gear" | "industry" | "tutorial";
  featuredImage: string;
  content: string;
}
