import type { Metadata } from "next";
import { inter, bebasNeue } from "@/lib/fonts";
import "@/styles/globals.css";

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
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable}`}>
      <body className="font-sans bg-background-deep text-text-primary">
        {children}
      </body>
    </html>
  );
}
