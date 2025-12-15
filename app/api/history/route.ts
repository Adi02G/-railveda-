import { NextResponse } from 'next/server';
import { getHistory } from '@/lib/db';

export async function GET() {
    const history = getHistory();
    return NextResponse.json(history);
}
