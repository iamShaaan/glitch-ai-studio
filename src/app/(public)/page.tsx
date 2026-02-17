import { HeroSection } from "@/components/sections/hero";
import { ProcessSection } from "@/components/sections/process";
import { CTASection } from "@/components/sections/cta";
import { TrustBar } from "@/components/sections/trust-bar";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ProcessSection />
      <CTASection />
    </>
  );
}
