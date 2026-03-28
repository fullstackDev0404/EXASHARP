// src/hooks.server.ts
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  try {
    // 1. Check the backend for the current user
    const res = await fetch('http://localhost:3000/api/me', {
      headers: {
        cookie: event.request.headers.get('cookie') ?? '',
      },
    });

    if (res.ok) {
      event.locals.user = await res.json();
    } else {
      event.locals.user = null;
    }
  } catch (e) {
    console.error('hooks fetch error:', e);
    event.locals.user = null;
  }

  // 2. Protection Logic (Moved inside the handle function)
  const isDashboardRoute = event.url.pathname.startsWith('/dashboard');

  if (isDashboardRoute && !event.locals.user) {
    throw redirect(303, '/login');
  }

  // 3. Complete the request
  return resolve(event);
};