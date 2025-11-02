import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ cookies }) => {
  const adminAuth = cookies.get('admin_authenticated');
  
  if (!adminAuth || adminAuth !== 'true') {
    throw redirect(303, '/admin/login');
  }
  
  return {};
};
