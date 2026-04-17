import { HeroSection } from "@/components/home/hero-section";
import { FeaturedWork } from "@/components/home/featured-work";
import { StatsCounter } from "@/components/home/stats-counter";
import { AboutTeaser } from "@/components/home/about-teaser";
import { Testimonials } from "@/components/home/testimonials";
import { CTASection } from "@/components/home/cta-section";
import { getSiteConfig, getAbout, getTestimonials } from "@/lib/content";

export default function HomePage() {
  const site = getSiteConfig();
  const about = getAbout();
  const testimonials = getTestimonials();

  return (
    <>
      <HeroSection name={site.name} title={site.title} youtubeId="EoXWVt3NjNI" reelYoutubeId="5RXfPmbynlk" />
      <FeaturedWork />
      <StatsCounter stats={[
        { value: site.stats.projects, suffix: "+", label: "Projects" },
        { value: site.stats.years, suffix: "", label: "Years" },
        { value: site.stats.clients, suffix: "+", label: "Clients" },
        { value: site.stats.awards, suffix: "", label: "Awards" },
      ]} />
      <AboutTeaser bio={about.bio} />
      <Testimonials testimonials={testimonials} />
      <CTASection />
    </>
  );
}
