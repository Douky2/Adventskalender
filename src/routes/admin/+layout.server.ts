import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
  // Login und Logout-Seiten nicht schützen
  if (url.pathname === '/admin/login' || url.pathname === '/admin/logout') {
    return {};
  }
  
  const adminAuth = cookies.get('admin_authenticated');
  
  if (!adminAuth || adminAuth !== 'true') {
    throw redirect(303, '/admin/login');
  }
  
  return {};
};
