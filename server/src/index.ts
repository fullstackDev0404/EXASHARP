import  { Context, Elysia } from 'elysia'
import { openapi } from '@elysiajs/openapi'
import { cors } from '@elysiajs/cors'
import { db } from './db';
import { auth } from './lib/auth';

const app = new Elysia()
  .use(openapi()) // Elysia OpenAPI plugin (optional, but highly recommended for API documentation)
  .use(cors()) // Enable CORS for all routes (you can configure this as needed)
  .decorate('db', db) // DB for handlers
  .decorate('user', null) // Add user property to context
  .get('/', () => 'Hello, Elysia!') // Basic route to test the server

  .listen(3000)

app.all("/api/auth/*", (ctx) => {
  return auth.handler(ctx.request);
});


export type App = typeof app;