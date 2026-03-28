// ============================================
// SHIFT MANAGEMENT
// ============================================

import { boolean, date, index, integer, pgTable, serial, text, timestamp, unique } from "drizzle-orm/pg-core";
import { company } from "./core";
import { employee } from "./employees";

export const shift = pgTable(
  "shift",
  {
    id: serial("id").primaryKey(),
    companyId: integer("company_id")
      .notNull()
      .references(() => company.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    code: text("code").notNull(),
    startTime: text("start_time").notNull(), // "09:00:00"
    endTime: text("end_time").notNull(),
    gracePeriod: integer("grace_period"), // minutes
    breakTime: integer("break_time"), // minutes
    workingHours: integer("working_hours"), // minutes
    isNightShift: boolean("is_night_shift").default(false),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    unique("shift_company_code").on(t.companyId, t.code),
    index("shift_company_idx").on(t.companyId),
  ],
);

export const employeeShift = pgTable(
  "employee_shift",
  {
    id: serial("id").primaryKey(),
    employeeId: integer("employee_id")
      .notNull()
      .references(() => employee.id, { onDelete: "cascade" }),
    shiftId: integer("shift_id")
      .notNull()
      .references(() => shift.id, { onDelete: "cascade" }),
    date: date("date").notNull(),
    assignedBy: integer("assigned_by").references(() => employee.id),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [
    unique("employee_shift_date").on(t.employeeId, t.date),
    index("emp_shift_employee_idx").on(t.employeeId),
    index("emp_shift_date_idx").on(t.date),
  ],
);