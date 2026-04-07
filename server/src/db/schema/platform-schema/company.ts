import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "../auth-schema";
import { companyStatusEnum } from "./enums";

export const company = pgTable("company", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  industry: text("industry"),
  country: text("country"),
  status: companyStatusEnum("status").default("pending").notNull(),
  requestedBy: text("requested_by").notNull().references(() => user.id),
  approvedBy: text("approved_by").references(() => user.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
