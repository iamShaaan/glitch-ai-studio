import { CareerApplicationForm } from "@/components/sections/career-application-form";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function ApplyPage() {
    return (
        <main className="min-h-screen bg-slate-950">
            <Header />
            <div className="pt-24 pb-12">
                <CareerApplicationForm />
            </div>
            <Footer />
        </main>
    );
}
