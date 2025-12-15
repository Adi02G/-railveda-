"use client";

interface LiveData {
    trainNumber: string;
    station: string;
    statusMessage: string;
    delay: number;
    upcomingStations: Array<{
        stationName: string;
        eta: string;
        distance: string;
    }>;
}

export default function LiveStatusResult({ data }: { data: LiveData }) {
    if (!data) return null;

    return (
        <div className="w-full max-w-3xl mx-auto mt-8 bg-black/60 border border-white/20 rounded-2xl overflow-hidden backdrop-blur-xl animate-in slide-in-from-bottom-4 text-white">
            <div className={`p-4 ${data.delay > 10 ? 'bg-orange-600/20 border-b border-orange-500/20' : 'bg-green-600/20 border-b border-green-500/20'}`}>
                <div className="flex items-start gap-4">
                    <div className={`mt-1 w-3 h-3 rounded-full animate-pulse ${data.delay > 10 ? 'bg-orange-500' : 'bg-green-500'}`}></div>
                    <div>
                        <h3 className="text-lg font-bold">{data.statusMessage}</h3>
                        <p className="text-gray-400 text-sm">Train {data.trainNumber} • Delay: {data.delay} min</p>
                    </div>
                </div>
            </div>

            <div className="p-6 relative">
                <div className="absolute left-8 top-6 bottom-6 w-0.5 bg-white/10"></div>
                <div className="space-y-8 relative">
                    {data.upcomingStations.map((st, i) => (
                        <div key={i} className="flex items-center gap-6 ml-1">
                            <div className="w-4 h-4 rounded-full bg-zinc-800 border-2 border-white/30 z-10"></div>
                            <div className="flex-1 flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5">
                                <div>
                                    <div className="font-bold">{st.stationName}</div>
                                    <div className="text-xs text-gray-500">{st.distance}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs text-gray-400">ETA</div>
                                    <div className="font-mono text-blue-300">{st.eta}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
