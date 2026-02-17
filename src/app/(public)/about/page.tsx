import { AboutSection } from "@/components/sections/about";
import { CTASection } from "@/components/sections/cta";

export default function AboutPage() {
    return (
        <>
            <div className="pt-20"> {/* Add padding for fixed header */}
                <AboutSection />
                <CTASection />
            </div>
        </>
    );
}
