
// ============================================
// AUDIT LOG (Enterprise tracking)
// ============================================

import { boolean, index, integer, json, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { auditActionEnum } from "./enums";
import { company } from "./core";
import { employee } from "./employee";

export const auditLog = pgTable(
  "audit_log",
  {
    id: serial("id").primaryKey(),
    companyId: integer("company_id").references(() => company.id),
    tableName: text("table_name").notNull(),
    recordId: integer("record_id").notNull(),
    action: auditActionEnum("action").notNull(),
    oldData: json("old_data"),
    newData: json("new_data"),
    changedBy: integer("changed_by").references(() => employee.id),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    changedAt: timestamp("changed_at").notNull().defaultNow(),
  },
  (t) => [
    index("audit_table_record_idx").on(t.tableName, t.recordId),
    index("audit_changed_by_idx").on(t.changedBy),
    index("audit_changed_at_idx").on(t.changedAt),
    index("audit_company_idx").on(t.companyId),
  ],
);

// ============================================
// NOTIFICATIONS
// ============================================

export const notification = pgTable(
  "notification",
  {
    id: serial("id").primaryKey(),
    companyId: integer("company_id")
      .notNull()
      .references(() => company.id, { onDelete: "cascade" }),
    employeeId: integer("employee_id")
      .notNull()
      .references(() => employee.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    message: text("message").notNull(),
    type: text("type").notNull(),
    priority: text("priority").default("normal"), // low, normal, high, urgent
    isRead: boolean("is_read").default(false),
    readAt: timestamp("read_at"),
    link: text("link"),
    metadata: json("metadata"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [
    index("notification_employee_idx").on(t.employeeId),
    index("notification_company_idx").on(t.companyId),
    index("notification_is_read_idx").on(t.isRead),
    index("notification_created_at_idx").on(t.createdAt),
  ],
);
