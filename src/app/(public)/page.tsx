import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { ProcessSection } from "@/components/sections/process";
import { CTASection } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProcessSection />
      <CTASection />
    </>
  );
}
