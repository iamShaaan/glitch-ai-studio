import { LandingHero } from "@/components/landing/landing-hero";
import { LandingServices } from "@/components/landing/landing-services";
import { LandingProcess } from "@/components/landing/landing-process";
import { LandingProof } from "@/components/landing/landing-proof";
import { LandingForm } from "@/components/landing/landing-form";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingNav } from "@/components/landing/landing-nav";

export default function Home() {
  return (
    <>
      <LandingNav />
      <LandingHero />
      <LandingServices />
      <LandingProcess />
      <LandingProof />
      <LandingForm />
      <LandingFooter />
    </>
  );
}
