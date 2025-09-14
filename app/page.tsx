import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { JourneySteps } from "@/components/journey-steps";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <JourneySteps />
    </main>
  );
}
