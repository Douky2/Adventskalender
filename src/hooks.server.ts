import { redirect, type Handle } from '@sveltejs/kit';
import { parse } from 'cookie';

const CALENDAR_PASSWORD = process.env.CALENDAR_PASSWORD || 'defaultPassword';

export const handle: Handle = async ({ event, resolve }) => {
  const cookies = parse(event.request.headers.get('cookie') || '');
  
  // Prüfe, ob der Benutzer bereits authentifiziert ist
  const isAuthenticated = cookies.calendar_auth === 'true';
  
  // Erlaube Zugriff auf die Login-Seite
  if (event.url.pathname === '/login') {
    return resolve(event);
  }
  
  // Wenn nicht authentifiziert, leite zur Login-Seite um
  if (!isAuthenticated) {
    throw redirect(303, '/login');
  }
  
  return resolve(event);
};
