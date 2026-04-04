import { HeroSequence } from "@/components/landing/hero-sequence";
import { LandingServices } from "@/components/landing/landing-services";
import { LandingProcess } from "@/components/landing/landing-process";
import { LandingProof } from "@/components/landing/landing-proof";
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
      <LandingProof />
      <LandingForm />
      <LandingFooter />
    </>
  );
}

