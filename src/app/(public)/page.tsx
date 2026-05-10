import { HeroSequence } from "@/components/landing/hero-sequence";
import { SystemOverview } from "@/components/landing/system-overview";
import { Phase1Requirements } from "@/components/landing/phase-1-requirements";
import { Phase2ContentMachine } from "@/components/landing/phase-2-content-machine";
import { Phase3AddOns } from "@/components/landing/phase-3-add-ons";
import { RealResults } from "@/components/landing/real-results";
import { Pricing } from "@/components/landing/pricing";
import { LandingReviews } from "@/components/landing/landing-reviews";
import { NewFAQ } from "@/components/landing/new-faq";
import { FinalCTA } from "@/components/landing/final-cta";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingNav } from "@/components/landing/landing-nav";
import { InfinityBackground } from "@/components/ui/infinity-bg";

export default function Home() {
  return (
    <>
      <InfinityBackground />
      <LandingNav />
      <HeroSequence />
      <SystemOverview />
      <Phase1Requirements />
      <Phase2ContentMachine />
      <Phase3AddOns />
      <RealResults />
      <Pricing />
      <LandingReviews />
      <NewFAQ />
      <FinalCTA />
      <LandingFooter />
    </>
  );
}
