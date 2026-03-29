
// ============================================
// KPI / PERFORMANCE MANAGEMENT
// ============================================

import { boolean, date, decimal, index, integer, json, pgTable, serial, text, timestamp, unique } from "drizzle-orm/pg-core";
import { company } from "./core";
import { employee } from "./employee";

export const kpi = pgTable(
  "kpi",
  {
    id: serial("id").primaryKey(),
    companyId: integer("company_id")
      .notNull()
      .references(() => company.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description"),
    category: text("category"), // individual, team, company
    unit: text("unit"), // percentage, number, boolean
    target: json("target"), // {min, max, target}
    weight: integer("weight").default(100),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    index("kpi_company_idx").on(t.companyId),
    index("kpi_category_idx").on(t.category),
  ],
);

export const performanceReview = pgTable(
  "performance_review",
  {
    id: serial("id").primaryKey(),
    companyId: integer("company_id")
      .notNull()
      .references(() => company.id, { onDelete: "cascade" }),
    employeeId: integer("employee_id")
      .notNull()
      .references(() => employee.id, { onDelete: "cascade" }),
    reviewerId: integer("reviewer_id")
      .notNull()
      .references(() => employee.id),
    reviewPeriod: text("review_period").notNull(),
    reviewDate: date("review_date").notNull(),
    overallRating: decimal("overall_rating", { precision: 3, scale: 1 }), // 1-5
    strengths: text("strengths"),
    areasOfImprovement: text("areas_of_improvement"),
    goals: json("goals"),
    comments: text("comments"),
    status: text("status").default("pending"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    index("perf_review_employee_idx").on(t.employeeId),
    index("perf_review_reviewer_idx").on(t.reviewerId),
    index("perf_review_company_idx").on(t.companyId),
  ],
);

export const employeeKpi = pgTable(
  "employee_kpi",
  {
    id: serial("id").primaryKey(),
    reviewId: integer("review_id")
      .notNull()
      .references(() => performanceReview.id, { onDelete: "cascade" }),
    kpiId: integer("kpi_id")
      .notNull()
      .references(() => kpi.id),
    score: decimal("score", { precision: 10, scale: 2 }),
    achievedValue: text("achieved_value"),
    comments: text("comments"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [
    unique("review_kpi_unique").on(t.reviewId, t.kpiId),
    index("emp_kpi_review_idx").on(t.reviewId),
  ],
);