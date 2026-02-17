import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center sm:p-20">
      <main className="flex flex-col items-center gap-8">
        <h1 className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
          GLITCH AI STUDIO
        </h1>
        <p className="max-w-xl text-lg text-slate-400">
          The Premier Digital Twin Agency. Your identity, immortalized.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/portal"
            className="flex items-center gap-2 px-6 py-3 font-medium text-white transition-all bg-emerald-600 rounded-lg hover:bg-emerald-700 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
          >
            Access Client Vault <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/admin"
            className="px-6 py-3 font-medium text-slate-300 transition-colors border border-slate-700 rounded-lg hover:bg-slate-800 hover:text-white"
          >
            Admin Panel
          </Link>
        </div>
      </main>
    </div>
  );
}
