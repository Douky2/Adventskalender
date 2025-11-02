import type { PageServerLoad } from './$types';
import { getAllDays } from '$lib/server/database';

export const load: PageServerLoad = async ({ url }) => {
  const allDays = await getAllDays();
  
  // 🎮 SIMULATIONSMODUS: ?simulation=true in der URL aktiviert alle Türchen
  const simulationMode = url.searchParams.get('simulation') === 'true';
  
  // Hole das aktuelle Datum vom Server
  const serverDate = new Date();
  const currentDay = serverDate.getDate();
  const currentMonth = serverDate.getMonth(); // 0-11
  const currentYear = serverDate.getFullYear();
  
  // Kalender-Konfiguration
  const CALENDAR_YEAR = parseInt(process.env.CALENDAR_YEAR || '2024');
  const CALENDAR_MONTH = parseInt(process.env.CALENDAR_MONTH || '11'); // Dezember
  
  // Berechne, welche Türen entsperrt sind
  const days = allDays.map(day => {
    // Im Simulationsmodus sind ALLE Türchen offen
    const isLocked = simulationMode ? false : (
      currentYear < CALENDAR_YEAR ||
      currentMonth < CALENDAR_MONTH ||
      (currentMonth === CALENDAR_MONTH && currentDay < day.dayNumber)
    );
    
    return {
      dayNumber: day.dayNumber,
      title: day.title,
      isLocked
    };
  });
  
  return {
    days,
    currentDay,
    currentMonth: currentMonth + 1, // Für Anzeige 1-12
    currentYear,
    simulationMode
  };
};
