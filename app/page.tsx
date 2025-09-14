import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { JourneySteps } from "@/components/journey-steps";
import { InteractiveExperience } from "@/components/interactive-experience";
import { ImpactConnections } from "@/components/impact-connections";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <JourneySteps />
      <InteractiveExperience />
      <ImpactConnections />
    </main>
  );
}
