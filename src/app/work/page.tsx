import { PageTransition } from "@/components/ui/page-transition";
import { VideoGrid } from "@/components/work/video-grid";

export const metadata = { title: "Work — Dali Sandic", description: "Selected cinematography and film work by Dali Sandic." };

export default function WorkPage() {
  return (
    <PageTransition>
      <div className="pt-32 pb-20 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <p className="text-text-muted text-[9px] tracking-label uppercase mb-2">Portfolio</p>
            <h1 className="text-text-primary text-3xl md:text-4xl tracking-display font-light uppercase">Selected Work</h1>
          </div>
          <VideoGrid />
        </div>
      </div>
    </PageTransition>
  );
}
