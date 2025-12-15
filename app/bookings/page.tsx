"use client";

import Navbar from "@/components/Navbar";
import WaveBackground from "@/components/WaveBackground";

const MOCK_BOOKINGS = [
    {
        pnr: "8901234567",
        trainNo: "12951",
        trainName: "MUMBAI RAJDHANI",
        from: "BCT",
        to: "NDLS",
        date: "2025-12-20",
        status: "CONFIRMED",
        seats: ["B1/45", "B1/46"]
    },
    {
        pnr: "4501239871",
        trainNo: "12002",
        trainName: "SHATABDI EXPRESS",
        from: "NDLS",
        to: "BPL",
        date: "2025-01-15",
        status: "WAITLIST",
        seats: ["WL/12", "WL/13"]
    },
    {
        pnr: "6712390812",
        trainNo: "22436",
        trainName: "VANDE BHARAT",
        from: "BSB",
        to: "NDLS",
        date: "2024-11-10",
        status: "COMPLETED",
        seats: ["C1/22"]
    }
];

export default function BookingsPage() {
    return (
        <div className="min-h-screen relative overflow-hidden bg-background text-foreground selection:bg-blue-500/30">
            {/* Background FX */}
            <div className="absolute inset-0 animate-aurora opacity-40 pointer-events-none"></div>
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none"></div>

            <Navbar />

            <main className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center perspective-1000">
                <div className="max-w-4xl w-full space-y-8 preserve-3d">
                    <div className="flex justify-between items-end">
                        <div>
                            <h1 className="text-4xl font-bold text-white tracking-tighter">My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Bookings</span></h1>
                            <p className="text-gray-400">Manage your upcoming and past journeys</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-gray-300">
                            Total Trips: {MOCK_BOOKINGS.length}
                        </div>
                    </div>

                    <div className="grid gap-6">
                        {MOCK_BOOKINGS.map((booking, i) => (
                            <div key={booking.pnr} className="group relative holographic-card rounded-2xl p-0 overflow-hidden hover-tilt transition-all duration-500" style={{ animationDelay: `${i * 150}ms` }}>
                                <div className={`h-full border-l-4 ${booking.status === 'CONFIRMED' ? 'border-green-500' : booking.status === 'WAITLIST' ? 'border-orange-500' : 'border-gray-500'} flex flex-col md:flex-row`}>

                                    {/* Left: Train Info */}
                                    <div className="p-6 flex-1 space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">{booking.trainName}</div>
                                                <div className="text-sm font-mono text-gray-400">PNR: {booking.pnr} | Train No: {booking.trainNo}</div>
                                            </div>
                                            <div className={`px-3 py-1 rounded-full text-xs font-bold border ${booking.status === 'CONFIRMED' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                                                booking.status === 'WAITLIST' ? 'bg-orange-500/10 border-orange-500/20 text-orange-400' :
                                                    'bg-gray-500/10 border-gray-500/20 text-gray-400'
                                                }`}>
                                                {booking.status}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-8">
                                            <div>
                                                <div className="text-xs text-gray-500 uppercase">From</div>
                                                <div className="text-xl font-bold text-white">{booking.from}</div>
                                            </div>
                                            <div className="flex-1 h-[1px] bg-white/10 relative">
                                                <div className="absolute right-0 -top-1">➤</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500 uppercase">To</div>
                                                <div className="text-xl font-bold text-white">{booking.to}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right: Date & Seats (Ticket Stub Look) */}
                                    <div className="relative p-6 bg-black/20 border-t md:border-t-0 md:border-l border-white/5 flex flex-col justify-center min-w-[200px] ticket-stub">
                                        {/* Perforation dots for visuals */}
                                        <div className="absolute -left-[10px] top-1/2 -translate-y-1/2 w-5 h-5 bg-black rounded-full md:block hidden"></div>
                                        <div className="absolute -right-[10px] top-1/2 -translate-y-1/2 w-5 h-5 bg-black rounded-full md:block hidden"></div>

                                        <div className="space-y-4 text-center md:text-left">
                                            <div>
                                                <div className="text-xs text-gray-500 uppercase">Journey Date</div>
                                                <div className="text-lg text-white font-mono">{booking.date}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500 uppercase">Seats</div>
                                                <div className="text-lg text-white font-mono">{booking.seats.join(", ")}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <WaveBackground />
        </div>
    );
}
