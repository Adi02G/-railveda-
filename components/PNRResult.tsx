"use client";

interface PNRData {
    pnrNumber: string;
    trainName: string;
    trainNumber: string;
    dateOfJourney: string;
    passengerList: Array<{
        passengerSerialNumber: number;
        currentStatus: string;
        bookingStatus: string;
    }>;
}

export default function PNRResult({ data }: { data: PNRData }) {
    if (!data) return null;

    return (
        <div className="w-full max-w-3xl mx-auto mt-8 bg-black/60 border border-white/20 rounded-2xl overflow-hidden backdrop-blur-xl animate-in slide-in-from-bottom-4 text-white">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex justify-between items-center">
                <div>
                    <div className="text-xs opacity-75 uppercase tracking-widest">PNR STATUS</div>
                    <div className="text-2xl font-mono font-bold">{data.pnrNumber}</div>
                </div>
                <div className="text-right">
                    <div className="text-lg font-bold">{data.trainName} ({data.trainNumber})</div>
                    <div className="text-sm opacity-90">{data.dateOfJourney}</div>
                </div>
            </div>

            <div className="p-6">
                <h4 className="text-sm text-gray-400 uppercase tracking-wider mb-4">Passenger List</h4>
                <div className="space-y-3">
                    {data.passengerList.map((p) => (
                        <div key={p.passengerSerialNumber} className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold">
                                    {p.passengerSerialNumber}
                                </div>
                                <div>
                                    <div className="text-xs text-gray-400">Booking Status</div>
                                    <div className="font-mono">{p.bookingStatus}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs text-gray-400">Current Status</div>
                                <div className={`font-bold ${p.currentStatus.includes('CNF') ? 'text-green-400' : 'text-orange-400'}`}>
                                    {p.currentStatus}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
