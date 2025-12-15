import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const trainNo = searchParams.get('trainNo');

    if (!trainNo) {
        return NextResponse.json({ error: "Train Number Required" }, { status: 400 });
    }

    // Mock Live Status Data
    const mockLiveStatus = {
        trainNumber: trainNo,
        currentStation: "BPL",
        currentStationName: "BHOPAL JN",
        status: "Departed",
        statusMessage: "Train has departed from BHOPAL JN (BPL) at 14:10.",
        delay: 15, // minutes
        upcomingStations: [
            { stationCode: "ET", stationName: "ITARSI JN", eta: "15:45", distance: "92 km" },
            { stationCode: "NGP", stationName: "NAGPUR", eta: "20:30", distance: "390 km" }
        ],
        lastUpdated: new Date().toISOString()
    };

    // Simulate delay
    await new Promise(r => setTimeout(r, 1500));

    return NextResponse.json({ success: true, data: mockLiveStatus });
}
