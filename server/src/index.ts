import { Elysia, status, t } from 'elysia'
import { openapi } from '@elysiajs/openapi'
import { cors } from '@elysiajs/cors'

const app = new Elysia()
  .use(openapi())
  .get('/', ()=> "Hello world")
  .post('/user', ({ body }) => {
    return { status: 'success', user: body.name };
  }, {
    body: t.Object({ name: t.String() })
  })
  .use(cors())
  .listen(8080)

  export type App = typeof app;
