

// ============================================
// TRAINING MANAGEMENT
// ============================================

import { boolean, date, decimal, index, integer, pgTable, serial, text, timestamp, unique } from "drizzle-orm/pg-core";
import { company } from "./core";
import { resignationStatusEnum, trainingStatusEnum } from "./enums";
import { employee } from "./employee";

export const training = pgTable(
  "training",
  {
    id: serial("id").primaryKey(),
    companyId: integer("company_id")
      .notNull()
      .references(() => company.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),
    type: text("type"), // technical, soft-skill, compliance
    startDate: date("start_date"),
    endDate: date("end_date"),
    location: text("location"),
    trainer: text("trainer"),
    maxParticipants: integer("max_participants"),
    cost: decimal("cost", { precision: 12, scale: 2 }),
    status: trainingStatusEnum("status").default("scheduled"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    index("training_company_idx").on(t.companyId),
    index("training_dates_idx").on(t.startDate, t.endDate),
  ],
);

export const trainingParticipant = pgTable(
  "training_participant",
  {
    id: serial("id").primaryKey(),
    trainingId: integer("training_id")
      .notNull()
      .references(() => training.id, { onDelete: "cascade" }),
    employeeId: integer("employee_id")
      .notNull()
      .references(() => employee.id, { onDelete: "cascade" }),
    completionStatus: boolean("completion_status").default(false),
    completionDate: date("completion_date"),
    feedback: text("feedback"),
    rating: integer("rating"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [
    unique("training_participant_unique").on(t.trainingId, t.employeeId),
    index("training_participant_emp_idx").on(t.employeeId),
  ],
);

// ============================================
// EXIT MANAGEMENT
// ============================================

export const resignation = pgTable(
  "resignation",
  {
    id: serial("id").primaryKey(),
    employeeId: integer("employee_id")
      .notNull()
      .references(() => employee.id, { onDelete: "cascade" }),
    resignationDate: date("resignation_date").notNull(),
    lastWorkingDay: date("last_working_day").notNull(),
    reason: text("reason"),
    status: resignationStatusEnum("status").default("pending"), // pending, approved, rejected, cancelled
    approvedById: integer("approved_by_id").references(() => employee.id),
    approvedAt: timestamp("approved_at"),
    counterOffer: text("counter_offer"),
    exitInterviewDate: date("exit_interview_date"),
    exitInterviewFeedback: text("exit_interview_feedback"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    index("resignation_employee_idx").on(t.employeeId),
    index("resignation_status_idx").on(t.status),
  ],
);

export const exitClearance = pgTable(
  "exit_clearance",
  {
    id: serial("id").primaryKey(),
    resignationId: integer("resignation_id")
      .notNull()
      .references(() => resignation.id, { onDelete: "cascade" }),
    department: text("department").notNull(), // hr, it, finance, admin
    clearedBy: integer("cleared_by").references(() => employee.id),
    clearedAt: timestamp("cleared_at"),
    remarks: text("remarks"),
    isCleared: boolean("is_cleared").default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [
    index("exit_clearance_resignation_idx").on(t.resignationId),
    index("exit_clearance_department_idx").on(t.department),
  ],
);


