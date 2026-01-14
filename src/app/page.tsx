import ScrollyTelling from "@/components/ScrollyTelling";
import Overlay from "@/components/Overlay";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      {/* 
           Height calculation:
           We have ~384 frames. 
           To feel premium, we want roughly 10-15px of scroll per frame?
           384 * 15 = ~5760px.
           Let's aim for about 600vh (600% viewport height) to give plenty of room.
        */}
      <div className="h-[600vh] relative">
        <div className="sticky top-0 h-dvh w-full overflow-hidden">

          {/* 1. Underlying Premium Gradient */}
          <div className="absolute inset-0 bg-premium-gradient opacity-50 z-[-1]" />

          {/* 2. The ScrollyTelling Engine (Canvas) */}
          <ScrollyTelling />

          {/* 3. The Text Overlay */}
          <Overlay />

        </div>
      </div>
    </main>
  );
}
