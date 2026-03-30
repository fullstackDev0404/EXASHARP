import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema/*", // Path to your schema
  out: "./drizzle", // Folder for migrations
  dialect: "postgresql", // 'sqlite' | 'mysql' | 'postgresql'
  dbCredentials: {
    url: process.env.DATABASE_URL!, // Path to your DB file
  },
  verbose: true, // Print generated SQL in console
  strict: true, // Strict mode for better type safety
});
