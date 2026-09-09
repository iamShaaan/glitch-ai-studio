import { LandingNav } from "@/components/landing/landing-nav";
import { LandingHero } from "@/components/landing/landing-hero";
import { MarqueeRunner } from "@/components/landing/marquee-runner";
import { CinemaRack } from "@/components/landing/cinema-rack";
import { CapabilitiesSection } from "@/components/landing/capabilities-section";
import { ProductionPipeline } from "@/components/landing/production-pipeline";
import { SelectedWorks } from "@/components/landing/selected-works";
import { LandingReviews } from "@/components/landing/landing-reviews";
import { VerifiedPlatforms } from "@/components/landing/verified-platforms";
import { Pricing } from "@/components/landing/pricing";
import { NewFAQ } from "@/components/landing/new-faq";
import { FounderSection } from "@/components/landing/founder-section";
import { FinalCTA } from "@/components/landing/final-cta";
import { LandingFooter } from "@/components/landing/landing-footer";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#0a0a0c] text-[#e5e1e4]">
      <LandingNav />
      <LandingHero />
      <MarqueeRunner />
      <CinemaRack />
      <CapabilitiesSection />
      <ProductionPipeline />
      <SelectedWorks />
      <LandingReviews />
      <VerifiedPlatforms />
      <Pricing />
      <NewFAQ />
      <FounderSection />
      <FinalCTA />
      <LandingFooter />
    </div>
  );
}
