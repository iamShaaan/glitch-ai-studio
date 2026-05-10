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
import { LazySection } from "@/components/ui/lazy-section";

// Approximate heights (px) used by the lazy placeholders so the page's
// scrollable area is stable before the real section mounts. Values are
// rough — tighter than the real rendered height is fine, the placeholder
// just reserves space until the section enters the viewport.
const SECTION_HEIGHT = {
  systemOverview: 800,
  phase1: 1400,
  phase2: 2000,
  phase3: 1200,
  caseStudies: 1600,
  pricing: 1800,
  reviews: 700,
  faq: 900,
  finalCta: 500,
  footer: 400,
};

export default function Home() {
  return (
    <>
      <InfinityBackground />
      <LandingNav />

      {/* Above the fold — always eager so the user sees the hero immediately */}
      <HeroSequence />

      {/* Below the fold — each section mounts only when its placeholder
          comes within ~400px of the viewport. Massively reduces first-
          paint work on mobile. Anchor ids are preserved on the
          placeholders so nav links still scroll correctly. */}
      <LazySection id="system-overview" minHeight={SECTION_HEIGHT.systemOverview}>
        <SystemOverview />
      </LazySection>
      <LazySection minHeight={SECTION_HEIGHT.phase1}>
        <Phase1Requirements />
      </LazySection>
      <LazySection minHeight={SECTION_HEIGHT.phase2}>
        <Phase2ContentMachine />
      </LazySection>
      <LazySection minHeight={SECTION_HEIGHT.phase3}>
        <Phase3AddOns />
      </LazySection>
      <LazySection id="case-studies" minHeight={SECTION_HEIGHT.caseStudies}>
        <RealResults />
      </LazySection>
      <LazySection id="pricing" minHeight={SECTION_HEIGHT.pricing}>
        <Pricing />
      </LazySection>
      <LazySection minHeight={SECTION_HEIGHT.reviews}>
        <LandingReviews />
      </LazySection>
      <LazySection id="faq" minHeight={SECTION_HEIGHT.faq}>
        <NewFAQ />
      </LazySection>
      <LazySection minHeight={SECTION_HEIGHT.finalCta}>
        <FinalCTA />
      </LazySection>
      <LazySection minHeight={SECTION_HEIGHT.footer}>
        <LandingFooter />
      </LazySection>
    </>
  );
}
