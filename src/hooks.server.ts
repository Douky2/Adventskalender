import { redirect, type Handle } from '@sveltejs/kit';
import { CALENDAR_PASSWORD } from '$env/static/private';

export const handle: Handle = async ({ event, resolve }) => {
  // Prüfe, ob der Benutzer bereits authentifiziert ist
  const isAuthenticated = event.cookies.get('calendar_auth') === 'true';
  
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
