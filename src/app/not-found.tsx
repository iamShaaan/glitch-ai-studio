import Link from "next/link";
import { GlitchText } from "@/components/ui/glitch-text";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-center px-4">
            <h1 className="text-6xl md:text-9xl font-bold text-white mb-4 tracking-tighter">
                <GlitchText text="404" />
            </h1>
            <h2 className="text-2xl font-bold text-slate-400 mb-8">
                SECTOR NOT FOUND
            </h2>
            <p className="text-slate-500 max-w-md mb-8">
                The requested data fragment has been purged or never existed.
                Return to the main interface immediately.
            </p>

            <Link
                href="/"
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded transition-all"
            >
                RETURN TO BASE
            </Link>
        </div>
    );
}
