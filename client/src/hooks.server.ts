import { redirect, type Handle } from '@sveltejs/kit';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export const handle: Handle = async ({ event, resolve }) => {
  try {
    const res = await fetch(`${API_URL}/api/me`, {
      headers: {
        cookie: event.request.headers.get('cookie') ?? '',
      },
    });

    event.locals.user = res.ok ? (await res.json()).user : null;
  } catch {
    event.locals.user = null;
  }

  if (event.url.pathname.startsWith('/dashboard') && !event.locals.user) {
    throw redirect(303, '/login');
  }

  return resolve(event);
};
