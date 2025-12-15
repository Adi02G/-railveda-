import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data');
const HISTORY_FILE = path.join(DB_PATH, 'history.json');

// Ensure directory exists
if (!fs.existsSync(DB_PATH)) {
    fs.mkdirSync(DB_PATH);
}

// Ensure file exists
if (!fs.existsSync(HISTORY_FILE)) {
    fs.writeFileSync(HISTORY_FILE, JSON.stringify([]));
}

export type SearchRecord = {
    id: string;
    from: string;
    to: string;
    date: string;
    timestamp: number;
};

export const getHistory = (): SearchRecord[] => {
    try {
        const data = fs.readFileSync(HISTORY_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

export const addToHistory = (record: Omit<SearchRecord, 'id' | 'timestamp'>) => {
    const history = getHistory();
    const newRecord = {
        ...record,
        id: Math.random().toString(36).substring(7),
        timestamp: Date.now(),
    };

    // Keep last 10 searches, newest first
    const updatedHistory = [newRecord, ...history].slice(0, 10);

    fs.writeFileSync(HISTORY_FILE, JSON.stringify(updatedHistory, null, 2));
    return newRecord;
};
