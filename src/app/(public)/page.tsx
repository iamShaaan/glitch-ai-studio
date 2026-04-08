import { HeroSequence } from "@/components/landing/hero-sequence";
import { LandingServices } from "@/components/landing/landing-services";
import { LandingProcess } from "@/components/landing/landing-process";
import { LandingUseCases } from "@/components/landing/landing-use-cases";
import { LandingReviews } from "@/components/landing/landing-reviews";
import { LandingProof } from "@/components/landing/landing-proof";
import { LandingFAQ } from "@/components/landing/landing-faq";
import { LandingForm } from "@/components/landing/landing-form";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingNav } from "@/components/landing/landing-nav";
import { InfinityBackground } from "@/components/ui/infinity-bg";

export default function Home() {
  return (
    <>
      <InfinityBackground />
      <LandingNav />
      <HeroSequence />
      <LandingServices />
      <LandingProcess />
      <LandingUseCases />
      <LandingReviews />
      <LandingProof />
      <LandingFAQ />
      <LandingForm />
      <LandingFooter />
    </>
  );
}

