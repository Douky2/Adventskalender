import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
  cookies.delete('admin_authenticated', { path: '/' });
  throw redirect(303, '/');
};
