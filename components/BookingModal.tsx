"use client";

import { useState } from "react";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    train: any;
}

export default function BookingModal({ isOpen, onClose, train }: BookingModalProps) {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [ticket, setTicket] = useState<any>(null);

    if (!isOpen || !train) return null;

    const handleMockBook = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/booking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    trainNo: train.id,
                    passengers: [{ name: 'Test User', age: 25, gender: 'M' }],
                    amount: train.price
                })
            });
            const data = await res.json();
            if (data.success) {
                setTicket(data.ticket);
                setStep(2);
            }
        } catch (e) {
            alert("Booking Failed");
        } finally {
            setLoading(false);
        }
    };

    const handleAffiliateRedirect = () => {
        const irctcUrl = `https://www.irctc.co.in/nget/train-search`;
        window.open(irctcUrl, '_blank');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-md overflow-hidden relative">

                {/* Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">
                        {step === 1 ? `Book ${train.name}` : 'Booking Confirmed!'}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {step === 1 ? (
                        <>
                            <div className="bg-white/5 p-4 rounded-lg space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Train No</span>
                                    <span className="text-white font-mono">{train.id}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Route</span>
                                    <span className="text-white">{train.startLocation} - {train.endLocation}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Price</span>
                                    <span className="text-green-400 font-bold">₹{train.price}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={handleMockBook}
                                    disabled={loading}
                                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl disabled:opacity-50"
                                >
                                    {loading ? 'Processing...' : 'Instant Book (Mock)'}
                                </button>

                                <button
                                    onClick={handleAffiliateRedirect}
                                    className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2"
                                >
                                    <span>IRCTC Official</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                </button>
                            </div>
                            <p className="text-xs text-center text-gray-500">
                                "Instant Book" simulates a transaction. "IRCTC Official" redirects you.
                            </p>
                        </>
                    ) : (
                        <div className="text-center space-y-6">
                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <div className="space-y-2">
                                <p className="text-gray-400">PNR Number</p>
                                <p className="text-3xl font-mono text-white tracking-widest">{ticket.pnr}</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl text-left">
                                <p className="text-xs text-gray-500 uppercase mb-2">Passenger Details</p>
                                {ticket.seats.map((s: any, i: number) => (
                                    <div key={i} className="flex justify-between text-sm text-white border-b border-white/5 last:border-0 py-2">
                                        <span>{s.name} ({s.coach}/{s.seat})</span>
                                        <span className="text-green-400">{s.status}</span>
                                    </div>
                                ))}
                            </div>
                            <button onClick={onClose} className="w-full bg-zinc-700 hover:bg-zinc-600 text-white py-3 rounded-xl">
                                Close
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
