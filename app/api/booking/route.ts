import { NextResponse } from 'next/server';
// import Ticket from '@/lib/models/Ticket';
// import mongoose from 'mongoose';

// Note: For this prototype without a running MongoDB, 
// we will simulate the Mongoose save operation.

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { trainNo, passengers, amount } = body;

        // 1. Mock Booking Logic
        const mockPnr = Math.floor(2000000000 + Math.random() * 9000000000).toString();

        // 2. Seat Assignment Logic (Mock)
        const coaches = ['B1', 'B2', 'A1', 'S1'];
        const assignedSeats = passengers.map((p: any) => ({
            ...p,
            status: 'CNF',
            coach: coaches[Math.floor(Math.random() * coaches.length)],
            seat: Math.floor(Math.random() * 72) + 1,
            berth: ['Lower', 'Middle', 'Upper', 'Side Lower'][Math.floor(Math.random() * 4)]
        }));

        // 3. Database Save Simulation
        // await mongoose.connect(process.env.MONGODB_URI);
        // const ticket = await Ticket.create({ ... });

        const mockTicket = {
            pnr: mockPnr,
            trainNo,
            status: 'Booked',
            seats: assignedSeats,
            amount,
            bookingDate: new Date().toISOString()
        };

        // Simulate processing delay
        await new Promise(r => setTimeout(r, 2000));

        return NextResponse.json({ success: true, ticket: mockTicket });

    } catch (error) {
        return NextResponse.json({ success: false, error: 'Booking Failed' }, { status: 500 });
    }
}
