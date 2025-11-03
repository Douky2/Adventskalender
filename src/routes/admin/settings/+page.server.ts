import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { getSetting, setSetting, getAllSettings } from '$lib/server/settings';

export const load: PageServerLoad = async () => {
  // Lese aktuelle Einstellungen aus der Datenbank
  try {
    const allSettings = await getAllSettings();
    
    const settings = {
      authorA: allSettings['PERSON_A_NAME'] || 'Locdoc',
      authorB: allSettings['PERSON_B_NAME'] || 'Miss Chaos',
      calendarYear: '2025', // Could be added to DB if needed
      calendarMonth: '11',  // Could be added to DB if needed
      calendarPassword: allSettings['CALENDAR_PASSWORD'] || '',
      adminPassword: allSettings['ADMIN_PASSWORD'] || '',
      simulationMode: allSettings['SIMULATION_MODE'] === 'true'
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
        simulationMode: false
      }
    };
  }
};

export const actions: Actions = {
  updateSettings: async ({ request }) => {
    const data = await request.formData();
    const authorA = data.get('authorA') as string;
    const authorB = data.get('authorB') as string;
    const calendarPassword = data.get('calendarPassword') as string;
    const adminPassword = data.get('adminPassword') as string;
    const simulationMode = data.get('simulationMode') === 'on';
    
    try {
      // Speichere in Datenbank statt .env
      await setSetting('PERSON_A_NAME', authorA, 'Name von Person A');
      await setSetting('PERSON_B_NAME', authorB, 'Name von Person B');
      
      if (calendarPassword) {
        await setSetting('CALENDAR_PASSWORD', calendarPassword, 'Passwort für den Kalender-Zugang');
      }
      if (adminPassword) {
        await setSetting('ADMIN_PASSWORD', adminPassword, 'Passwort für das Admin-Panel');
      }
      
      await setSetting('SIMULATION_MODE', simulationMode ? 'true' : 'false', 'Simulationsmodus (alle Türchen offen)');
      
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
