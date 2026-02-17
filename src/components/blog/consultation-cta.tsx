import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export const ConsultationCTA = () => {
    return (
        <div className="w-full my-12 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 via-indigo-600 to-emerald-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-gradient-x"></div>
            <div className="relative bg-slate-900 border border-slate-800 rounded-lg p-8 md:p-12 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                    <div className="md:w-2/3">
                        <div className="flex items-center gap-2 text-emerald-500 font-mono text-sm mb-2">
                            <Sparkles className="w-4 h-4" />
                            <span>READY_TO_SCALE?</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                            Turn These Insights Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">Action</span>
                        </h3>
                        <p className="text-slate-400 leading-relaxed">
                            Stop guessing with your marketing strategy. Book a free consultation with our team and let&apos;s decode your growth potential together.
                        </p>
                    </div>

                    <div className="md:w-1/3 flex justify-center md:justify-end">
                        <Link
                            href="https://tidycal.com/2hwebsolutions"
                            target="_blank"
                            className="relative inline-flex group/btn"
                        >
                            <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover/btn:opacity-100 group-hover/btn:-inset-1 group-hover/btn:duration-200 animate-tilt"></div>
                            <button className="relative inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white transition-all duration-200 bg-slate-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
                                <span className="mr-2">BOOK CONSULTATION</span>
                                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
