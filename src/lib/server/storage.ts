import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.resolve('data');

// Ensure data directory exists
async function ensureDir() {
    try {
        await fs.access(DATA_DIR);
    } catch {
        await fs.mkdir(DATA_DIR, { recursive: true });
    }
}

// Generic helper to read/write JSON
async function readJson<T>(filename: string, defaultValue: T): Promise<T> {
    await ensureDir();
    const filePath = path.join(DATA_DIR, filename);
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist, write default and return it
        await writeJson(filename, defaultValue);
        return defaultValue;
    }
}

async function writeJson<T>(filename: string, data: T): Promise<void> {
    await ensureDir();
    const filePath = path.join(DATA_DIR, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

// --- Types (mirrored from Prisma schema) ---

export interface Day {
    id: number;
    dayNumber: number;
    title: string;
    contentTypeA: string;
    contentA: string;
    authorA: string | null;
    contentTypeB: string | null;
    contentB: string | null;
    authorB: string | null;
    taskForB: string | null;
    responseMode: string;
    linkedToPrevious: boolean;
    linkedToNext: boolean;
    storyChainId: string | null;
    combinedResult: string | null;
    resultGenerated: boolean;
    createdAt: string; // ISO string
    updatedAt: string; // ISO string
}

export interface Tile {
    id: number;
    title: string;
    description: string | null;
    category: string;
    contentType: string;
    content: string;
    author: string | null;
    taskForB: string | null;
    responseMode: string;
    linkedToPrevious: boolean;
    linkedToNext: boolean;
    storyChainId: string | null;
    tags: string | null;
    isFavorite: boolean;
    usageCount: number;
    assignedToDayNumber: number | null;
    createdAt: string;
    updatedAt: string;
}

export interface Setting {
    id: number;
    key: string;
    value: string;
    description: string | null;
    updatedAt: string;
    createdAt: string;
}

export interface ChainState {
    id: number;
    storyChainId: string;
    dayNumber: number;
    chosenColor: string | null;
    chosenTheme: string | null;
    chosenElement: string | null;
    textInput: string | null;
    stateData: string | null;
    updatedAt: string;
    createdAt: string;
}

export interface Message {
    id: number;
    dayNumber: number;
    author: string;
    message: string;
    timestamp: string;
}

// --- Data Access Objects ---

export const db = {
    days: {
        async getAll(): Promise<Day[]> {
            const days = await readJson<Day[]>('days.json', []);
            return days.sort((a, b) => a.dayNumber - b.dayNumber);
        },
        async getByDayNumber(dayNumber: number): Promise<Day | null> {
            const days = await this.getAll();
            return days.find(d => d.dayNumber === dayNumber) || null;
        },
        async update(dayNumber: number, data: Partial<Day>): Promise<Day> {
            const days = await this.getAll();
            const index = days.findIndex(d => d.dayNumber === dayNumber);
            if (index === -1) {
                // Create if not exists (though usually we expect 24 days to exist)
                const newDay: Day = {
                    id: Date.now(),
                    dayNumber,
                    title: `Türchen ${dayNumber}`,
                    contentTypeA: 'TEXT',
                    contentA: '',
                    authorA: 'Locdoc',
                    contentTypeB: null,
                    contentB: null,
                    authorB: null,
                    taskForB: null,
                    responseMode: 'DISABLED',
                    linkedToPrevious: false,
                    linkedToNext: false,
                    storyChainId: null,
                    combinedResult: null,
                    resultGenerated: false,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    ...data
                };
                days.push(newDay);
                await writeJson('days.json', days);
                return newDay;
            } else {
                days[index] = { ...days[index], ...data, updatedAt: new Date().toISOString() };
                await writeJson('days.json', days);
                return days[index];
            }
        },
        async updateById(id: number, data: Partial<Day>): Promise<Day> {
             const days = await this.getAll();
             const index = days.findIndex(d => d.id === id);
             if (index === -1) throw new Error(`Day with id ${id} not found`);
             days[index] = { ...days[index], ...data, updatedAt: new Date().toISOString() };
             await writeJson('days.json', days);
             return days[index];
        },
        async delete(id: number): Promise<void> {
             let days = await this.getAll();
             days = days.filter(d => d.id !== id);
             await writeJson('days.json', days);
        }
    },
    tiles: {
        async getAll(): Promise<Tile[]> {
            return readJson<Tile[]>('tiles.json', []);
        },
        async create(data: Omit<Tile, 'id' | 'createdAt' | 'updatedAt'>): Promise<Tile> {
            const tiles = await this.getAll();
            const newTile: Tile = {
                ...data,
                id: Date.now(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            tiles.push(newTile);
            await writeJson('tiles.json', tiles);
            return newTile;
        },
        async update(id: number, data: Partial<Tile>): Promise<Tile> {
            const tiles = await this.getAll();
            const index = tiles.findIndex(t => t.id === id);
            if (index === -1) throw new Error('Tile not found');
            tiles[index] = { ...tiles[index], ...data, updatedAt: new Date().toISOString() };
            await writeJson('tiles.json', tiles);
            return tiles[index];
        },
        async delete(id: number): Promise<void> {
            let tiles = await this.getAll();
            tiles = tiles.filter(t => t.id !== id);
            await writeJson('tiles.json', tiles);
        },
        async deleteAll(): Promise<void> {
            await writeJson('tiles.json', []);
        }
    },
    settings: {
        async getAll(): Promise<Setting[]> {
            return readJson<Setting[]>('settings.json', []);
        },
        async get(key: string): Promise<string | null> {
            const settings = await this.getAll();
            const setting = settings.find(s => s.key === key);
            return setting ? setting.value : null;
        },
        async set(key: string, value: string, description?: string): Promise<Setting> {
            const settings = await this.getAll();
            const index = settings.findIndex(s => s.key === key);
            if (index === -1) {
                const newSetting: Setting = {
                    id: Date.now(),
                    key,
                    value,
                    description: description || null,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                settings.push(newSetting);
                await writeJson('settings.json', settings);
                return newSetting;
            } else {
                settings[index] = { ...settings[index], value, updatedAt: new Date().toISOString() };
                if (description) settings[index].description = description;
                await writeJson('settings.json', settings);
                return settings[index];
            }
        }
    },
    chainState: {
        async getAll(): Promise<ChainState[]> {
            return readJson<ChainState[]>('chainState.json', []);
        },
        async getByChainId(storyChainId: string): Promise<ChainState[]> {
            const states = await this.getAll();
            return states.filter(s => s.storyChainId === storyChainId);
        },
        async upsert(storyChainId: string, dayNumber: number, data: Partial<ChainState>): Promise<ChainState> {
            const states = await this.getAll();
            const index = states.findIndex(s => s.storyChainId === storyChainId && s.dayNumber === dayNumber);
            if (index === -1) {
                const newState: ChainState = {
                    id: Date.now(),
                    storyChainId,
                    dayNumber,
                    chosenColor: null,
                    chosenTheme: null,
                    chosenElement: null,
                    textInput: null,
                    stateData: null,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    ...data
                };
                states.push(newState);
                await writeJson('chainState.json', states);
                return newState;
            } else {
                states[index] = { ...states[index], ...data, updatedAt: new Date().toISOString() };
                await writeJson('chainState.json', states);
                return states[index];
            }
        }
    },
    messages: {
        async getAll(): Promise<Message[]> {
            return readJson<Message[]>('messages.json', []);
        },
        async getByDay(dayNumber: number): Promise<Message[]> {
            const messages = await this.getAll();
            return messages.filter(m => m.dayNumber === dayNumber).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        },
        async create(data: Omit<Message, 'id' | 'timestamp'>): Promise<Message> {
            const messages = await this.getAll();
            const newMessage: Message = {
                ...data,
                id: Date.now(),
                timestamp: new Date().toISOString()
            };
            messages.push(newMessage);
            await writeJson('messages.json', messages);
            return newMessage;
        }
    }
};
