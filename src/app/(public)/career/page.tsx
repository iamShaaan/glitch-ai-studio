import { CareerHero } from "@/components/sections/career-hero";
import { CareerGrowthModel } from "@/components/sections/career-growth-model";
import { CareerRoles } from "@/components/sections/career-roles";
import { CareerForm } from "@/components/sections/career-form";

export const metadata = {
    title: "Career Protocol | Glitch AI Studio",
    description: "Join the vanguard of AI pioneers. We build the future of identity.",
};

export default function CareerPage() {
    return (
        <>
            <CareerHero />
            <CareerGrowthModel />
            <CareerRoles />
            <CareerForm />
        </>
    );
}
