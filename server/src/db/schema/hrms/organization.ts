import {
  integer,
  text,
  json,
  boolean,
  timestamp,
  unique,
  index,
  pgTable,
  serial,
  date,
} from "drizzle-orm/pg-core";

import { company } from "./core";
import { employee } from "./employees";

// ============================================
// DEPARTMENT (With company support)
// ============================================

export const department = pgTable(
  "department",
  {
    id: serial("id").primaryKey(),
    companyId: integer("company_id")
      .notNull()
      .references(() => company.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    code: text("code").notNull(),
    description: text("description"),
    location: text("location"),
    managerId: integer("manager_id"),
    parentDepartmentId: integer("parent_department_id"),
    isActive: boolean("is_active").notNull().default(true),
    deletedAt: timestamp("deleted_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    unique("dept_company_code").on(t.companyId, t.code),
    index("dept_name_idx").on(t.name),
    index("dept_company_idx").on(t.companyId),
    index("dept_manager_idx").on(t.managerId),
    index("dept_parent_idx").on(t.parentDepartmentId),
  ],
);

// ============================================
// POSITION
// ============================================

export const position = pgTable(
  "position",
  {
    id: serial("id").primaryKey(),
    companyId: integer("company_id")
      .notNull()
      .references(() => company.id, { onDelete: "cascade" }),
    departmentId: integer("department_id")
      .notNull()
      .references(() => department.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    code: text("code").notNull(),
    level: text("level"),
    minSalary: integer("min_salary"),
    maxSalary: integer("max_salary"),
    responsibilities: json("responsibilities"),
    requirements: json("requirements"),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    unique("position_company_code").on(t.companyId, t.code),
    index("position_title_idx").on(t.title),
    index("position_dept_idx").on(t.departmentId),
    index("position_company_idx").on(t.companyId),
  ],
);

