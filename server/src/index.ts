import { Elysia } from "elysia";
import { openapi } from "@elysiajs/openapi";
import { cors } from "@elysiajs/cors";
import { db } from "./db";
import { auth } from "./lib/auth";

const app = new Elysia()
  .use(openapi())
  .use(
    cors({
      credentials: true,
      origin: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  )

  .decorate("db", db)
  .decorate("auth", auth)
  .get("/", () => "Hello, Elysia!")
  .post("/api/auth/sign-up/email", (ctx) => auth.handler(ctx.request))
  .post("/api/auth/sign-in/email", (ctx) => auth.handler(ctx.request))
  .post("/api/auth/sign-out", (ctx) => auth.handler(ctx.request))
  .get("/api/auth/list-sessions", (ctx) => auth.handler(ctx.request))
  .post("/api/auth/session", (ctx) => auth.handler(ctx.request))
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

export type App = typeof app;
