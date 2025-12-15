"use client";

import { useState } from "react";
import SearchForm, { SearchParams } from "@/components/SearchForm";
import ResultsList from "@/components/ResultsList";
import WaveBackground from "@/components/WaveBackground";
import Navbar from "@/components/Navbar";
import type { Train } from "@/app/api/trains/route";

export default function Home() {
  const [results, setResults] = useState<Train[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (params: SearchParams) => {
    setIsLoading(true);
    setResults([]); // Clear previous results

    const query = new URLSearchParams({
      startTime: params.startTime,
      startLocation: params.startLocation,
      endLocation: params.endLocation
    });

    try {
      const res = await fetch(`/api/trains?${query.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error("Failed to fetch trains", error);
      // Could show error state here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-background text-foreground selection:bg-blue-500/30">
      {/* Background Gradient Orbs */}
      {/* Animated Background */}
      <div className="absolute inset-0 animate-aurora opacity-40 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[100px] animate-float"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }}></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none"></div>

      {/* Wave Effect */}
      <WaveBackground />

      {/* Header */}
      <Navbar />

      <main className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center perspective-1000">
        <div className="text-center mb-12 max-w-3xl mx-auto space-y-6 preserve-3d">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 dark:border-white/10 border-gray-200 text-xs text-blue-600 dark:text-blue-300 font-medium mb-2 hover-tilt transition-transform duration-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Live System Mock v1.0
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-purple-600 dark:text-white tracking-tighter">
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600">RailVeda</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Discover the most convenient train routes with our premium lookup service.
            Enter your details below to get started immediately.
          </p>
        </div>

        <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        <ResultsList results={results} isLoading={isLoading} />

        <footer className="mt-32 text-gray-600 text-sm">
          © 2025 RailVeda Inc. All rights reserved.
        </footer>
      </main>
    </div>
  );
}
