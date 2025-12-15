"use client";

import Navbar from "@/components/Navbar";
import WaveBackground from "@/components/WaveBackground";

export default function ContactPage() {
    return (
        <div className="min-h-screen relative overflow-hidden bg-background text-foreground selection:bg-blue-500/30">
            {/* Background FX */}
            <div className="absolute inset-0 animate-aurora opacity-40 pointer-events-none"></div>
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none"></div>

            <Navbar />

            <main className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center perspective-1000">
                <div className="max-w-2xl w-full space-y-8 preserve-3d">
                    <div className="text-center space-y-4">
                        <h1 className="text-5xl font-bold text-white tracking-tighter">Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-600">Touch</span></h1>
                        <p className="text-gray-400">We'd love to hear about your journey with RailVeda.</p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl hover-tilt transition-all duration-500">
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase text-gray-400 ml-1">First Name</label>
                                    <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Aditya" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase text-gray-400 ml-1">Last Name</label>
                                    <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Kumar" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase text-gray-400 ml-1">Email</label>
                                <input type="email" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="aditya@example.com" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase text-gray-400 ml-1">Message</label>
                                <textarea className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 h-32 resize-none" placeholder="Tell us about your experience..."></textarea>
                            </div>

                            <button className="w-full shimmer-btn bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-100 transition-colors">
                                Send Message
                            </button>
                        </form>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-500 pt-8">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition-colors">
                            <div className="mb-2 text-2xl">📧</div>
                            <div>support@railveda.in</div>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition-colors">
                            <div className="mb-2 text-2xl">📞</div>
                            <div>+91 1800-RAIL-VEDA</div>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition-colors">
                            <div className="mb-2 text-2xl">📍</div>
                            <div>Cyber City, Gurugram</div>
                        </div>
                    </div>
                </div>
            </main>

            <WaveBackground />
        </div>
    );
}
