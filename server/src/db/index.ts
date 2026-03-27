import { drizzle } from "drizzle-orm/node-postgres";
import { Pool, neonConfig } from "@neondatabase/serverless";
import * as schema from "./schema";
import ws from "ws";

neonConfig.webSocketConstructor = ws;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("error", (err: Error) => {
  console.error("Unexpected Neon DB error:", err);
});

export const db = drizzle(pool, { schema });
