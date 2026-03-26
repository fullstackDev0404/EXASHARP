import { Elysia, status, t } from 'elysia'
import { openapi } from '@elysiajs/openapi'
import { cors } from '@elysiajs/cors'
import { db } from '../db';

const app = new Elysia()
  .use(openapi()) // Elysia OpenAPI plugin (optional, but highly recommended for API documentation)
  .use(cors()) // Enable CORS for all routes (you can configure this as needed)
  .decorate('db', db) // DB for handlers
  
  .get('/', () => 'Hello, Elysia!') // Basic route to test the server
  .get('/users', ({ db }) => {
    return db.query.users.findMany();
  })
  .listen(3000)

export type App = typeof app;