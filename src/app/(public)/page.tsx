import { HeroSection } from "@/components/sections/hero";
import { GrowthFunnelSection } from "@/components/sections/growth-engine";
import { CTASection } from "@/components/sections/cta";
import { TrustBar } from "@/components/sections/trust-bar";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <GrowthFunnelSection />
      <CTASection />
    </>
  );
}
