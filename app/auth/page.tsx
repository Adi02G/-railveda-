"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import WaveBackground from "@/components/WaveBackground";

export default function AuthPage() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Mock Authentication Delay
        await new Promise(r => setTimeout(r, 1500));

        setIsLoading(false);
        // Redirect to home (Mock success)
        router.push('/');
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-background text-foreground selection:bg-blue-500/30 flex items-center justify-center">
            {/* Background FX */}
            <div className="absolute inset-0 animate-aurora opacity-40 pointer-events-none"></div>
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none"></div>

            {/* Back Button */}
            <Link href="/" className="absolute top-8 left-8 text-gray-400 hover:text-white flex items-center gap-2 z-50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                Back to Home
            </Link>

            <div className="relative z-10 w-full max-w-md perspective-1000">
                <div className="holographic-card rounded-3xl p-8 md:p-12 hover-tilt transition-all duration-500 preserve-3d">

                    {/* Header */}
                    <div className="text-center mb-8 space-y-2">
                        <div className="inline-block p-4 rounded-full bg-blue-500/10 mb-2">
                            <img src="/logo.png" className="w-12 h-12" alt="Logo" />
                        </div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h1>
                        <p className="text-gray-400 text-sm">
                            {isLogin ? 'Enter your credentials to access your journeys' : 'Join RailVeda to unlock premium features'}
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase text-gray-400 ml-1">Full Name</label>
                                <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 input-glow transition-all" placeholder="John Doe" required />
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase text-gray-400 ml-1">Email Address</label>
                            <input type="email" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 input-glow transition-all" placeholder="name@example.com" required />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase text-gray-400 ml-1">Password</label>
                            <input type="password" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 input-glow transition-all" placeholder="••••••••" required />
                        </div>

                        <button
                            disabled={isLoading}
                            className="w-full shimmer-btn bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-50"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    Processing...
                                </span>
                            ) : (
                                isLogin ? 'Sign In' : 'Create Account'
                            )}
                        </button>
                    </form>

                    {/* Footer Toggle */}
                    <div className="mt-8 text-center text-sm text-gray-400">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-orange-400 hover:text-orange-300 font-semibold transition-colors"
                        >
                            {isLogin ? 'Sign Up' : 'Log In'}
                        </button>
                    </div>
                </div>
            </div>

            <WaveBackground />
        </div>
    );
}
