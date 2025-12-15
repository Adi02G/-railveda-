"use client";

import { useState } from "react";
import type { Train } from "@/app/api/trains/route";
import BookingModal from "./BookingModal";

interface ResultsListProps {
    results: Train[];
    isLoading: boolean;
}

export default function ResultsList({ results, isLoading }: ResultsListProps) {
    const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);
    if (isLoading) {
        return (
            <div className="w-full max-w-5xl mx-auto mt-12 flex flex-col items-center justify-center space-y-4">
                <div className="relative w-24 h-24">
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-white/10 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                </div>
                <p className="text-gray-400 animate-pulse">Finding best connections...</p>
            </div>
        );
    }

    if (results.length === 0) return null;

    return (
        <div className="w-full max-w-5xl mx-auto mt-12 space-y-6">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Available Trains</h2>
                <span className="text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">{results.length} results found</span>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {results.map((train, index) => (
                    <div
                        key={train.id}
                        className="group relative holographic-card rounded-2xl p-6 overflow-hidden"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="bg-blue-500/10 text-blue-400 p-2 rounded-lg">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">{train.name}</h3>
                                    <span className="text-xs font-mono text-gray-500 bg-black/50 px-2 py-1 rounded border border-white/5">{train.id}</span>
                                </div>

                                <div className="flex items-center gap-8 mt-4">
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Departure</div>
                                        <div className="text-lg font-medium text-white">{new Date(train.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                        <div className="text-sm text-gray-400">{train.startLocation}</div>
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <div className="text-xs text-gray-600 mb-1">{train.duration}</div>
                                        <div className="w-32 h-[2px] bg-white/10 relative">
                                            <div className="absolute w-2 h-2 bg-blue-500 rounded-full left-0 -top-[3px]"></div>
                                            <div className="absolute w-2 h-2 bg-blue-500 rounded-full right-0 -top-[3px]"></div>
                                        </div>
                                        <div className="text-xs text-blue-400/50 mt-1">Direct</div>
                                    </div>

                                    <div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Arrival</div>
                                        <div className="text-lg font-medium text-white">{new Date(train.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                        <div className="text-sm text-gray-400">{train.endLocation}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-1 w-full md:w-auto justify-between md:justify-start border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-white">₹{train.price}</div>
                                    <div className="text-xs text-gray-500">per person</div>
                                </div>
                                <button
                                    onClick={() => setSelectedTrain(train)}
                                    className="shimmer-btn bg-white text-black hover:bg-blue-50 font-semibold py-3 px-8 rounded-xl transition-all shadow-lg shadow-white/5 active:scale-95"
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <BookingModal
                isOpen={!!selectedTrain}
                onClose={() => setSelectedTrain(null)}
                train={selectedTrain}
            />
        </div>
    );
}
