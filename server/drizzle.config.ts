import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts', // Path to your schema
  out: './drizzle',             // Folder for migrations
  dialect: 'postgresql',            // 'sqlite' | 'mysql' | 'postgresql'
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_Pv1debUis4LM@ep-soft-union-am50ejnv-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',           // Path to your DB file
  },
});
