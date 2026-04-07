import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { user } from "../auth-schema";

export const exaAdminInvite = pgTable("exa_admin_invite", {
  id: text("id").primaryKey(),
  token: text("token").notNull().unique(),
  createdBy: text("created_by").notNull().references(() => user.id),
  usedBy: text("used_by").references(() => user.id),
  expiresAt: timestamp("expires_at").notNull(),
  used: boolean("used").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
