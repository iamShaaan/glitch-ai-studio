import { CareerHero } from "@/components/sections/career-hero";
import { CareerGrowthModel } from "@/components/sections/career-growth-model";
import { CareerRoles } from "@/components/sections/career-roles";


export const metadata = {
    title: "Career Hub | Glitch AI Studio",
    description: "Join our global, remote-first team building the future of AI.",
};

export default function CareerPage() {
    return (
        <>
            <CareerHero />
            <CareerGrowthModel />
            <CareerRoles />
            {/* Apply CTA */}
            <section className="py-24 bg-slate-950 relative overflow-hidden text-center">
                <div className="container px-4 mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-6">Ready to Join the Team?</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto mb-8">
                        We are looking for the outliers. The ones who see the code behind the reality.
                    </p>
                    <a
                        href="/career/apply"
                        className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-lg transition-all transform hover:scale-105"
                    >
                        APPLY NOW
                    </a>
                </div>
            </section>
        </>
    );
}
