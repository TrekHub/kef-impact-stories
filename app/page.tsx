import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { JourneySteps } from "@/components/journey-steps";
import { InteractiveExperience } from "@/components/interactive-experience";
import { ImpactConnections } from "@/components/impact-connections";
import { QRLanding } from "@/components/qr-landing";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <QRLanding />
      <HeroSection />
      <JourneySteps />
      <InteractiveExperience />
      <ImpactConnections />
    </main>
  );
}
