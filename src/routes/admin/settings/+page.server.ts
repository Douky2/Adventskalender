import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import fs from 'fs';
import path from 'path';

export const load: PageServerLoad = async () => {
  // Lese aktuelle Einstellungen aus .env
  const envPath = path.join(process.cwd(), '.env');
  let settings = {
    authorA: 'Locdoc',
    authorB: 'Miss Chaos',
    calendarYear: '2025',
    calendarMonth: '11',
    calendarPassword: env.CALENDAR_PASSWORD || '',
    adminPassword: env.ADMIN_PASSWORD || ''
  };
  
  // Versuche .env zu lesen
  try {
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf-8');
      const authorAMatch = envContent.match(/AUTHOR_A="?([^"\n]+)"?/);
      const authorBMatch = envContent.match(/AUTHOR_B="?([^"\n]+)"?/);
      
      if (authorAMatch) settings.authorA = authorAMatch[1];
      if (authorBMatch) settings.authorB = authorBMatch[1];
    }
  } catch (error) {
    console.error('Fehler beim Lesen der .env:', error);
  }
  
  return { settings };
};

export const actions: Actions = {
  updateSettings: async ({ request }) => {
    const data = await request.formData();
    const authorA = data.get('authorA') as string;
    const authorB = data.get('authorB') as string;
    const calendarYear = data.get('calendarYear') as string;
    const calendarMonth = data.get('calendarMonth') as string;
    const calendarPassword = data.get('calendarPassword') as string;
    const adminPassword = data.get('adminPassword') as string;
    
    try {
      const envPath = path.join(process.cwd(), '.env');
      let envContent = '';
      
      // Lese existierende .env
      if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, 'utf-8');
      }
      
      // Update oder füge Werte hinzu
      const updateOrAdd = (content: string, key: string, value: string) => {
        const regex = new RegExp(`^${key}=.*$`, 'm');
        if (regex.test(content)) {
          return content.replace(regex, `${key}="${value}"`);
        } else {
          return content + `\n${key}="${value}"`;
        }
      };
      
      envContent = updateOrAdd(envContent, 'AUTHOR_A', authorA);
      envContent = updateOrAdd(envContent, 'AUTHOR_B', authorB);
      envContent = updateOrAdd(envContent, 'CALENDAR_YEAR', calendarYear);
      envContent = updateOrAdd(envContent, 'CALENDAR_MONTH', calendarMonth);
      
      if (calendarPassword) {
        envContent = updateOrAdd(envContent, 'CALENDAR_PASSWORD', calendarPassword);
      }
      if (adminPassword) {
        envContent = updateOrAdd(envContent, 'ADMIN_PASSWORD', adminPassword);
      }
      
      fs.writeFileSync(envPath, envContent, 'utf-8');
      
      return { 
        success: true, 
        message: '⚙️ Einstellungen gespeichert! Bitte Server neustarten damit Änderungen aktiv werden.' 
      };
    } catch (error) {
      return fail(500, { error: 'Fehler beim Speichern der Einstellungen!' });
    }
  }
};
