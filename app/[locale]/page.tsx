import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { RoadStory } from "@/components/sections/RoadStory";
import { OneRoof } from "@/components/sections/OneRoof";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PainToSolution } from "@/components/sections/PainToSolution";
import { PackagesTeaser } from "@/components/sections/PackagesTeaser";
import { HorizontalServices } from "@/components/sections/HorizontalServices";
import { LocationsPreview } from "@/components/sections/LocationsPreview";
import { ResourcesPreview } from "@/components/sections/ResourcesPreview";
import { CtaBand } from "@/components/sections/CtaBand";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-background">
      <Hero />

      {/* Trust Metrics Bar */}
      <TrustBar />

      {/* Road Story cinematic scrollytelling */}
      <RoadStory />

      {/* One Roof Section */}
      <OneRoof />

      <HorizontalServices />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Pain to Solution Scrollytelling Section */}
      <PainToSolution />

      {/* Packages Teaser Section */}
      <PackagesTeaser />

      <LocationsPreview />

      <ResourcesPreview />

      <CtaBand />

    </main>
  );
}
