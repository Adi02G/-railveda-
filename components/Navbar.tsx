"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path ? "text-blue-600 dark:text-blue-400 font-bold" : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400";

    return (
        <nav className="relative z-50 w-full p-6 flex justify-between items-center max-w-7xl mx-auto">
            <Link href="/" className="flex items-center gap-3 group">
                <img src="/logo.png" alt="RailVeda Logo" className="w-10 h-10 rounded-lg shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform duration-300" />
                <div className="font-bold text-2xl text-gray-900 dark:text-white tracking-tight">RailVeda</div>
            </Link>
            <div className="hidden md:flex gap-8 text-sm font-medium items-center">
                <Link href="/" className={`transition-colors ${isActive('/')}`}>Home</Link>
                <Link href="/bookings" className={`transition-colors ${isActive('/bookings')}`}>My Bookings</Link>
                <Link href="/contact" className={`transition-colors ${isActive('/contact')}`}>Contact</Link>
                <Link
                    href="/auth"
                    className="px-5 py-2 rounded-lg bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/20 hover:text-primary transition-all font-semibold"
                >
                    Sign In
                </Link>
                <ThemeToggle />
            </div>

            {/* Mobile Menu Icon (Mock) */}
            <div className="md:hidden text-foreground">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </div>
        </nav>
    );
}
