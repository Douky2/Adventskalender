import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { CALENDAR_PASSWORD } from '$env/static/private';
import { dev } from '$app/environment';

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const password = data.get('password');

    if (password !== CALENDAR_PASSWORD) {
      return fail(400, { error: 'Falsches Passwort. Versuch es nochmal! 🔒' });
    }

    // Setze einen Cookie für 7 Tage
    cookies.set('calendar_auth', 'true', {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: !dev,
      maxAge: 60 * 60 * 24 * 7 // 7 Tage
    });

    throw redirect(303, '/');
  }
};
