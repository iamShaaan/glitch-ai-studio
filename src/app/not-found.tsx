import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#060d11] text-center px-4 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      {/* Glow effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#26f7b2]/[0.04] blur-[200px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-8xl md:text-[12rem] font-black text-gradient-emerald tracking-tighter leading-none mb-4">
          404
        </h1>
        <h2 className="text-xl md:text-2xl font-bold text-slate-400 mb-4 tracking-widest uppercase">
          Sector Not Found
        </h2>
        <p className="text-slate-500 max-w-md mb-10 text-sm leading-relaxed">
          The requested data fragment has been purged or never existed.
          Return to the main interface.
        </p>

        <Link
          href="/"
          className="px-8 py-4 bg-[#26f7b2] hover:bg-[#26f7b2]/90 text-[#09333f] font-bold rounded-full transition-all glow-emerald hover:scale-105 active:scale-95"
        >
          Return to Base
        </Link>
      </div>
    </div>
  );
}
