import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gold-subtle bg-background-base">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <p className="text-gold font-display text-lg tracking-display uppercase mb-3">Sandic</p>
            <p className="text-text-muted text-sm leading-relaxed">Cinematographer & Visual Storyteller<br />Based in Copenhagen, Denmark</p>
          </div>
          <div className="flex gap-12">
            <div>
              <p className="text-text-muted text-[9px] tracking-label uppercase mb-4">Navigation</p>
              <div className="flex flex-col gap-2.5">
                {["Work", "About", "Services", "Journal", "Contact"].map((item) => (
                  <Link key={item} href={`/${item.toLowerCase()}`} className="text-text-secondary text-sm hover:text-gold transition-colors">{item}</Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-text-muted text-[9px] tracking-label uppercase mb-4">Social</p>
              <div className="flex flex-col gap-2.5">
                <a href="#" className="text-text-secondary text-sm hover:text-gold transition-colors">Instagram</a>
                <a href="#" className="text-text-secondary text-sm hover:text-gold transition-colors">Vimeo</a>
                <a href="#" className="text-text-secondary text-sm hover:text-gold transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
          <div>
            <p className="text-text-muted text-[9px] tracking-label uppercase mb-4">Get in Touch</p>
            <a href="mailto:hello@sandicfilm.com" className="text-gold text-sm hover:underline">hello@sandicfilm.com</a>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-text-subtle/30 text-center">
          <p className="text-text-subtle text-xs">&copy; {new Date().getFullYear()} Dali Sandic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
