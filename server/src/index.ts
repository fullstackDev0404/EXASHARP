import { Elysia } from "elysia";
import { openapi } from "@elysiajs/openapi";
import { cors } from "@elysiajs/cors";
import { db } from "./db";
import { auth } from "./lib/auth";

const app = new Elysia()
  .use(openapi())
  .use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    }),
  )

  .decorate("db", db)
  .decorate("auth", auth)
  .get(
    "/",
    () => "This ERP system is under development and not yet production-ready.",
  )
  .get("/api/me", async (ctx) => {
    try {
      const session = await auth.api.getSession({
        headers: ctx.request.headers as any,
      });
      if (!session) {
        ctx.set.status = 401;
        return { error: "Unauthorized" };
      }
      return { user: session.user };
    } catch (error) {
      ctx.set.status = 401;
      return { error: "Unauthorized" };
    }
  })
  
  .listen(3000);

app.all("/api/auth/*", (ctx) => auth.handler(ctx.request));

export type App = typeof app;
