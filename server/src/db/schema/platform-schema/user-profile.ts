import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { user } from "../auth-schema";
import { company } from "../hrms-schema/core";

export const userProfile = pgTable("user_profile", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().unique().references(() => user.id, { onDelete: "cascade" }),
  companyId: text("company_id").references(() => company.code),
  isExaAdmin: boolean("is_exa_admin").default(false).notNull(),
  onboardingComplete: boolean("onboarding_complete").default(false).notNull(),
  jobTitle: text("job_title"),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
