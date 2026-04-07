import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";
import { company } from "../hrms-schema/core";
import { planTypeEnum, employeeTierEnum, subscriptionStatusEnum } from "./enums";

export const subscription = pgTable("subscription", {
  id: text("id").primaryKey(),
  companyId: integer("company_id").notNull().references(() => company.id, { onDelete: "cascade" }),
  planType: planTypeEnum("plan_type").notNull(),
  employeeTier: employeeTierEnum("employee_tier").notNull(),
  status: subscriptionStatusEnum("status").default("active").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
