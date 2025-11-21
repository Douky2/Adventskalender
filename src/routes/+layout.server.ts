import { db } from '$lib/server/storage';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
    const settings = await db.settings.getAll();
    const musicAutoplay = settings.find(s => s.key === 'MUSIC_AUTOPLAY')?.value === 'true';
    const enableSnow = settings.find(s => s.key === 'ENABLE_SNOW')?.value === 'true';
    
    let musicFiles: string[] = [];
    try {
        const musicDir = join(process.cwd(), 'static', 'music');
        const files = await readdir(musicDir);
        musicFiles = files.filter(f => f.endsWith('.mp3'));
    } catch (e) {
        console.error('Error reading music directory:', e);
    }

    return {
        musicAutoplay,
        enableSnow,
        musicFiles
    };
};