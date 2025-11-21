import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/storage';

export const load: PageServerLoad = async () => {
  // Lese aktuelle Einstellungen aus der Datenbank
  try {
    const allSettingsRaw = await db.settings.getAll();
    const allSettings = Object.fromEntries(allSettingsRaw.map(s => [s.key, s.value]));
    
    const settings = {
      authorA: allSettings['PERSON_A_NAME'] || 'Locdoc',
      authorB: allSettings['PERSON_B_NAME'] || 'Miss Chaos',
      calendarYear: allSettings['CALENDAR_YEAR'] || '2025',
      calendarMonth: allSettings['CALENDAR_MONTH'] || '11',
      calendarPassword: allSettings['CALENDAR_PASSWORD'] || '',
      adminPassword: allSettings['ADMIN_PASSWORD'] || '',
      simulationMode: allSettings['SIMULATION_MODE'] === 'true',
      enableSnow: allSettings['ENABLE_SNOW'] === 'true',
      musicAutoplay: allSettings['MUSIC_AUTOPLAY'] === 'true'
    };
    
    return { settings };
  } catch (error) {
    console.error('Fehler beim Lesen der Settings:', error);
    // Fallback zu Standardwerten
    return {
      settings: {
        authorA: 'Locdoc',
        authorB: 'Miss Chaos',
        calendarYear: '2025',
        calendarMonth: '11',
        calendarPassword: '',
        adminPassword: '',
        simulationMode: false,
        enableSnow: true,
        musicAutoplay: false
      }
    };
  }
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
    const simulationMode = data.has('simulationMode');
    const enableSnow = data.has('enableSnow');
    const musicAutoplay = data.has('musicAutoplay');
    
    try {
      // Speichere in Datenbank statt .env
      const settingsToUpdate = [
        { key: 'PERSON_A_NAME', value: authorA, description: 'Name von Person A' },
        { key: 'PERSON_B_NAME', value: authorB, description: 'Name von Person B' },
        { key: 'CALENDAR_YEAR', value: calendarYear, description: 'Jahr des Kalenders' },
        { key: 'CALENDAR_MONTH', value: calendarMonth, description: 'Monat des Kalenders (0-11)' },
        { key: 'SIMULATION_MODE', value: simulationMode ? 'true' : 'false', description: 'Simulationsmodus (alle Türchen offen)' },
        { key: 'ENABLE_SNOW', value: enableSnow ? 'true' : 'false', description: 'Schnee-Effekt aktivieren' },
        { key: 'MUSIC_AUTOPLAY', value: musicAutoplay ? 'true' : 'false', description: 'Musik automatisch abspielen' }
      ];

      if (calendarPassword) {
        settingsToUpdate.push({ key: 'CALENDAR_PASSWORD', value: calendarPassword, description: 'Passwort für den Kalender-Zugang' });
      }
      if (adminPassword) {
        settingsToUpdate.push({ key: 'ADMIN_PASSWORD', value: adminPassword, description: 'Passwort für das Admin-Panel' });
      }

      for (const setting of settingsToUpdate) {
        await db.settings.set(setting.key, setting.value, setting.description);
      }
      
      return { 
        success: true, 
        message: '⚙️ Einstellungen erfolgreich in Datenbank gespeichert! Änderungen sind sofort aktiv.' 
      };
    } catch (error) {
      console.error('Fehler beim Speichern:', error);
      return fail(500, { error: 'Fehler beim Speichern der Einstellungen in der Datenbank!' });
    }
  }
};
