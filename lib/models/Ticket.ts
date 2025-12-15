import mongoose, { Schema, model, models } from 'mongoose';

const TicketSchema = new Schema({
    userId: { type: String, required: true },
    trainNo: { type: String, required: true },
    pnr: { type: String, required: true, unique: true },
    status: { type: String, enum: ['Booked', 'Cancelled', 'Waitlist'], default: 'Booked' },
    seatNumber: { type: String, required: true },
    passengers: [{
        name: String,
        age: Number,
        gender: String
    }],
    amount: Number,
    createdAt: { type: Date, default: Date.now }
});

// Prevent Mongoose Re-compilation Error in HMR (Hot Module Replacement)
const Ticket = models.Ticket || model('Ticket', TicketSchema);

export default Ticket;
