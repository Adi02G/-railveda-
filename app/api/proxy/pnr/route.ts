import { NextResponse } from 'next/server';
import { fetchRapidApiData } from '@/lib/api-wrapper';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const pnr = searchParams.get('pnr');

    if (!pnr || pnr.length !== 10) {
        return NextResponse.json({ error: "Invalid PNR Format" }, { status: 400 });
    }

    try {
        // 1. Attempt Real API Call
        // const data = await fetchRapidApiData('/api/v3/getPNRStatus', { pnrNumber: pnr });
        // return NextResponse.json(data);

        // For Prototype compatibility, we TRIGGER the Mock Fallback immediately 
        // to ensure the user sees the UI working without paying for the API yet.
        throw new Error("Force Mock for Demo");

    } catch (error) {
        // 2. Mock Fallback (Simulating a "Success" response structure from IRCTC)
        const mockResponse = {
            data: {
                pnrNumber: pnr,
                trainNumber: "12951",
                trainName: "MUMBAI RAJDHANI",
                dateOfJourney: new Date().toISOString().split('T')[0],
                sourceStation: "BCT",
                destinationStation: "NDLS",
                reservationUpto: "NDLS",
                passengerList: [
                    { passengerSerialNumber: 1, currentStatus: "CNF", bookingStatus: "CNF/B1/12" },
                    { passengerSerialNumber: 2, currentStatus: "RAC 12", bookingStatus: "WL 45" }
                ],
                chartPrepared: false
            },
            status: true
        };

        // Simulate network latency
        await new Promise(r => setTimeout(r, 1200));

        return NextResponse.json(mockResponse);
    }
}
