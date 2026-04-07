import { pgEnum } from "drizzle-orm/pg-core";

export const companyStatusEnum = pgEnum("company_status", ["pending", "active", "rejected"]);
export const planTypeEnum = pgEnum("plan_type", ["monthly", "3month", "6month", "yearly"]);
export const employeeTierEnum = pgEnum("employee_tier", ["lt50", "50to500", "gt500"]);
export const subscriptionStatusEnum = pgEnum("subscription_status", ["active", "expired", "cancelled"]);
