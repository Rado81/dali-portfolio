import { ScrollReveal } from "./scroll-reveal";

interface SectionHeadingProps {
  label: string;
  title: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({ label, title, align = "left", className = "" }: SectionHeadingProps) {
  return (
    <ScrollReveal className={`${align === "center" ? "text-center" : ""} ${className}`}>
      <p className="text-text-muted text-[9px] tracking-label uppercase mb-2">{label}</p>
      <h2 className="text-text-primary text-2xl md:text-3xl tracking-wide font-light uppercase">{title}</h2>
    </ScrollReveal>
  );
}
