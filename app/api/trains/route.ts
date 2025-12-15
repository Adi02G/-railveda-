import { NextResponse } from 'next/server';
import { stations } from '@/lib/stations';
import { addToHistory } from '@/lib/db';

export type Train = {
    id: string;
    name: string;
    departureTime: string;
    arrivalTime: string;
    startLocation: string;
    endLocation: string;
    price: number;
    duration: string;
    status?: string; // e.g., "On Time", "Delayed 10m"
};

const RAPID_API_KEY = process.env.RAPIDAPI_KEY;
const RAPID_API_HOST = 'irctc1.p.rapidapi.com'; // Example host

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const startLocation = searchParams.get('startLocation')?.toUpperCase(); // Expecting Code e.g., NDLS
    const endLocation = searchParams.get('endLocation')?.toUpperCase(); // Expecting Code e.g., CSMT
    const date = searchParams.get('startTime'); // ISO string

    // Log to history
    if (startLocation && endLocation) {
        addToHistory({
            from: startLocation,
            to: endLocation,
            date: date || new Date().toISOString()
        });
    }

    // Mock Indian Trains Data
    const mockIndianTrains: Train[] = [
        {
            id: "12951",
            name: "Mumbai Rajdhani",
            departureTime: date ? new Date(new Date(date).setHours(17, 0)).toISOString() : new Date().toISOString(),
            arrivalTime: date ? new Date(new Date(date).setHours(8, 30) + 86400000).toISOString() : new Date().toISOString(),
            startLocation: "CSMT",
            endLocation: "NDLS",
            price: 3500,
            duration: "15h 30m",
            status: "On Time"
        },
        {
            id: "12002",
            name: "Bhopal Shatabdi",
            departureTime: date ? new Date(new Date(date).setHours(6, 0)).toISOString() : new Date().toISOString(),
            arrivalTime: date ? new Date(new Date(date).setHours(14, 30)).toISOString() : new Date().toISOString(),
            startLocation: "NDLS",
            endLocation: "BPL",
            price: 1500,
            duration: "8h 30m",
            status: "Delayed 5m"
        },
        {
            id: "22436",
            name: "Vande Bharat Express",
            departureTime: date ? new Date(new Date(date).setHours(15, 0)).toISOString() : new Date().toISOString(),
            arrivalTime: date ? new Date(new Date(date).setHours(23, 0)).toISOString() : new Date().toISOString(),
            startLocation: "NDLS",
            endLocation: "BSB",
            price: 2800,
            duration: "8h 00m",
            status: "On Time"
        }
    ];

    // If we have an API Key, try to fetch real data (Pseudo-code for integration)
    if (RAPID_API_KEY) {
        try {
            // const response = await fetch(`https://${RAPID_API_HOST}/api/v3/trainBetweenStations?fromCode=${startLocation}&toCode=${endLocation}&dateOfJourney=${date}`, {
            //     headers: {
            //         'X-RapidAPI-Key': RAPID_API_KEY,
            //         'X-RapidAPI-Host': RAPID_API_HOST
            //     }
            // });
            // const data = await response.json();
            // if (data.status) {
            //    return NextResponse.json(mapRealData(data.data)); // Need a mapper function
            // }
            console.log("Real API integration point. Add Key to .env to enable.");
        } catch (e) {
            console.error("API Fetch Failed, falling back to mock");
        }
    }

    // Fallback to sophisticated mock
    // Filter mock trains if they roughly match (for demo purposes we just return them all or filtered by code if we had a big DB)

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    return NextResponse.json(mockIndianTrains);
}
