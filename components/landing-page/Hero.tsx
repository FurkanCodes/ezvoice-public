import { AnimatedBeamDemo } from "../general/animated";
import { HeroBoxReveal } from "../general/box-reveal";

export default function Hero() {
  return (
    <div className="relative bg-card overflow-hidden ">
      <div className="max-w-7xl mx-auto h-full">
        <div className="relative z-10 py-8 sm:py-16 lg:py-24">
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 h-full">
              {/* Left Column - Hero Content */}
              <div className="w-full lg:w-1/2 space-y-8">
                <HeroBoxReveal />
              </div>

              {/* Right Column - Animated Beam */}
              <div className="w-full lg:w-1/2 relative h-[500px] lg:h-auto">
                <div className="absolute inset-0 z-0">
                  <AnimatedBeamDemo />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
