import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-400 text-sm">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-white font-bold mb-4">GLITCH AI STUDIO</h3>
                    <p>Digital Twin & AI Automation Agency.<br />Vienna, Austria.</p>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-4">Services</h4>
                    <ul className="space-y-2">
                        <li><Link href="/services/avatars" className="hover:text-emerald-400 transition-colors">Digital Avatars</Link></li>
                        <li><Link href="/services/automation" className="hover:text-emerald-400 transition-colors">Automation</Link></li>
                        <li><Link href="/services/consulting" className="hover:text-emerald-400 transition-colors">AI Consulting</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-4">Company</h4>
                    <ul className="space-y-2">
                        <li><Link href="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
                        <li><Link href="/career" className="hover:text-emerald-400 transition-colors">Careers</Link></li>
                        <li><Link href="/contact" className="hover:text-emerald-400 transition-colors">Contact</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-4">Legal</h4>
                    <ul className="space-y-2">
                        <li><Link href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link></li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-900 flex justify-between items-center">
                <p>&copy; {new Date().getFullYear()} Glitch AI Studio. All rights reserved.</p>


            </div>
        </footer>
    );
}
