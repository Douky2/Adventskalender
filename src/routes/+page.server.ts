import type { PageServerLoad } from './$types';
import { db } from '$lib/server/storage';
import { CALENDAR_YEAR, CALENDAR_MONTH } from '$env/static/private';

export const load: PageServerLoad = async ({ url }) => {
  const allDays = await db.days.getAll();
  const settings = await db.settings.getAll();
  
  const getSetting = (key: string) => settings.find(s => s.key === key)?.value;

  // 🎮 SIMULATIONSMODUS: ?simulation=true in der URL ODER Einstellung in DB
  const simulationModeUrl = url.searchParams.get('simulation') === 'true';
  const simulationModeDb = getSetting('SIMULATION_MODE') === 'true';
  const simulationMode = simulationModeUrl || simulationModeDb;
  
  const enableSnow = getSetting('ENABLE_SNOW') === 'true';
  const musicAutoplay = getSetting('MUSIC_AUTOPLAY') === 'true';

  // Hole das aktuelle Datum vom Server
  const serverDate = new Date();
  const currentDay = serverDate.getDate();
  const currentMonth = serverDate.getMonth(); // 0-11
  const currentYear = serverDate.getFullYear();
  
  // Kalender-Konfiguration (DB hat Vorrang vor .env)
  const dbYear = getSetting('CALENDAR_YEAR');
  const dbMonth = getSetting('CALENDAR_MONTH');
  
  const calendarYear = dbYear ? parseInt(dbYear) : parseInt(CALENDAR_YEAR);
  const calendarMonth = dbMonth ? parseInt(dbMonth) : parseInt(CALENDAR_MONTH);
  
  // Berechne, welche Türen entsperrt sind
  const days = allDays.map(day => {
    // Im Simulationsmodus sind ALLE Türchen offen
    const isLocked = simulationMode ? false : (
      currentYear < calendarYear ||
      currentMonth < calendarMonth ||
      (currentMonth === calendarMonth && currentDay < day.dayNumber)
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
    simulationMode,
    enableSnow,
    musicAutoplay
  };
};
