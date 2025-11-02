import type { PageServerLoad, Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const ADMIN_PASSWORD = env.ADMIN_PASSWORD || 'admin2025';

export const load: PageServerLoad = async ({ cookies }) => {
  // Wenn bereits eingeloggt, redirect zu Admin
  const adminAuth = cookies.get('admin_authenticated');
  if (adminAuth === 'true') {
    throw redirect(303, '/admin');
  }
  
  return {};
};

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const password = data.get('password') as string;
    
    if (password === ADMIN_PASSWORD) {
      cookies.set('admin_authenticated', 'true', {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // 24 Stunden
      });
      
      throw redirect(303, '/admin');
    }
    
    return fail(401, { error: '❌ Falsches Passwort!' });
  }
};
