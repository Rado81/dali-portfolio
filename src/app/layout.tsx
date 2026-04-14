import type { Metadata } from "next";
import { inter, bebasNeue } from "@/lib/fonts";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "@/styles/globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Dali Sandic — Cinematographer & Visual Storyteller",
  description:
    "Portfolio of Dali Sandic, a cinematographer dedicated to visual storytelling through film.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(inter.variable, bebasNeue.variable, "font-sans", geist.variable)}>
      <body className="font-sans bg-background-deep text-text-primary">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
