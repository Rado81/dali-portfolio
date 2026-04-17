"use client";

import { useState } from "react";
import { PageTransition } from "@/components/ui/page-transition";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { FilmGrain } from "@/components/ui/film-grain";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Mail, Phone, MapPin } from "lucide-react";

const projectTypes = ["Narrative Film", "Commercial", "Music Video", "Documentary", "Other"];
const budgetRanges = ["Under $5,000", "$5,000 – $15,000", "$15,000 – $50,000", "$50,000+", "Let's discuss"];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", projectType: "", budget: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("Thank you! Your message has been sent.");
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const inputClass = "w-full bg-background-surface border border-text-subtle rounded-sm px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-gold focus:outline-none transition-colors";

  return (
    <PageTransition>
      <section className="relative pt-32 pb-16 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background-elevated to-background-deep" />
        <FilmGrain />
        <div className="relative z-20 text-center">
          <p className="text-text-muted text-[9px] tracking-label uppercase mb-3">Contact</p>
          <h1 className="font-display text-4xl md:text-6xl tracking-display uppercase text-text-primary">Get in Touch</h1>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="grid md:grid-cols-[3fr_2fr] gap-12 md:gap-16">
          <ScrollReveal>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-text-muted text-[9px] tracking-label uppercase mb-2">Name</label>
                <input name="name" value={formData.name} onChange={handleChange} required className={inputClass} placeholder="Your name" />
              </div>
              <div>
                <label className="block text-text-muted text-[9px] tracking-label uppercase mb-2">Email</label>
                <input name="email" type="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-text-muted text-[9px] tracking-label uppercase mb-2">Project Type</label>
                <select name="projectType" value={formData.projectType} onChange={handleChange} className={inputClass}>
                  <option value="">Select type</option>
                  {projectTypes.map((t) => (<option key={t} value={t}>{t}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-text-muted text-[9px] tracking-label uppercase mb-2">Budget Range</label>
                <select name="budget" value={formData.budget} onChange={handleChange} className={inputClass}>
                  <option value="">Select range</option>
                  {budgetRanges.map((b) => (<option key={b} value={b}>{b}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-text-muted text-[9px] tracking-label uppercase mb-2">Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows={5} required className={inputClass} placeholder="Tell me about your project..." />
              </div>
              <MagneticButton className="text-background-deep text-[11px] tracking-label uppercase bg-gold px-8 py-4 rounded-sm hover:bg-gold-dark transition-colors w-full md:w-auto">Send Message</MagneticButton>
            </form>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="space-y-8">
              <div>
                <p className="text-text-muted text-[9px] tracking-label uppercase mb-4">Contact Info</p>
                <div className="space-y-4">
                  <a href="mailto:Dali@sandicfilm.com" className="flex items-center gap-3 text-text-secondary text-sm hover:text-gold transition-colors"><Mail className="w-4 h-4 text-gold" /> Dali@sandicfilm.com</a>
                  <a href="tel:+4523663748" className="flex items-center gap-3 text-text-secondary text-sm hover:text-gold transition-colors"><Phone className="w-4 h-4 text-gold" /> +45 23 66 37 48</a>
                  <p className="flex items-center gap-3 text-text-secondary text-sm"><MapPin className="w-4 h-4 text-gold" /> Copenhagen, Denmark</p>
                </div>
              </div>
              <div>
                <p className="text-text-muted text-[9px] tracking-label uppercase mb-4">Social</p>
                <div className="flex gap-4">
                  {[
                    { name: "Instagram", href: "https://instagram.com/dalisandic" },
                    { name: "YouTube", href: "https://www.youtube.com/@daliborsandic4938" },
                    { name: "LinkedIn", href: "https://www.linkedin.com/in/dalibor-sandic-955204139/" },
                  ].map((p) => (<a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className="text-text-secondary text-sm hover:text-gold transition-colors">{p.name}</a>))}
                </div>
              </div>
              <div>
                <p className="text-text-muted text-[9px] tracking-label uppercase mb-2">Availability</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                  <p className="text-text-secondary text-sm">Currently booking Q3 2026</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </PageTransition>
  );
}
