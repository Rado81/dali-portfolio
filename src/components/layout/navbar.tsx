"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/journal", label: "Journal" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function handleScroll() { setIsScrolled(window.scrollY > 50); }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setIsMobileOpen(false); }, [pathname]);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled ? "bg-background-base/80 backdrop-blur-md" : "bg-transparent"}`}>
        <nav className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
          <Link href="/" onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-gold font-display text-lg tracking-display uppercase hover:opacity-80 transition-opacity">Sandic</Link>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={`text-[11px] tracking-label uppercase transition-colors ${pathname === link.href ? "text-gold" : "text-white hover:text-gold"}`}>{link.label}</Link>
            ))}
            <Link href="/contact" className="text-[10px] tracking-label uppercase bg-gold text-background-deep px-5 py-2.5 rounded-sm hover:bg-gold-dark transition-colors">Contact</Link>
          </div>
          <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="md:hidden flex flex-col gap-1.5" aria-label="Toggle menu">
            <motion.span animate={isMobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }} className="block w-5 h-px bg-gold origin-center" />
            <motion.span animate={isMobileOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }} className="block w-3.5 h-px bg-gold origin-center" />
          </button>
        </nav>
      </header>
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-30 bg-background-deep flex flex-col items-center justify-center gap-8">
            {[...navLinks, { href: "/contact", label: "Contact" }].map((link, i) => (
              <motion.div key={link.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.4 }}>
                <Link href={link.href} className={`text-3xl tracking-wide uppercase font-light transition-colors ${pathname === link.href ? "text-gold" : "text-white hover:text-gold"}`}>{link.label}</Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
