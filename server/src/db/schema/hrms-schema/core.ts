// ============================================
// MULTI-TENANCY (Company)
// ============================================

import { boolean, date, index, integer, pgTable, serial, text, timestamp, unique } from "drizzle-orm/pg-core";


export const company = pgTable(
  "company",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    code: text("code").notNull().unique(),
    registrationNo: text("registration_no"),
    taxId: text("tax_id"),
    email: text("email"),
    phone: text("phone"),
    address: text("address"),
    city: text("city"),
    state: text("state"),
    country: text("country").default("Bangladesh"),
    postalCode: text("postal_code"),
    website: text("website"),
    logo: text("logo"),
    fiscalYearStart: date("fiscal_year_start"),
    fiscalYearEnd: date("fiscal_year_end"),
    timezone: text("timezone").default("Asia/Dhaka"),
    isActive: boolean("is_active").default(true),
    deletedAt: timestamp("deleted_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    index("company_name_idx").on(t.name),
    index("company_code_idx").on(t.code),
    index("company_is_active_idx").on(t.isActive),
  ],
);

// ============================================
// RBAC (Role-Based Access Control)
// ============================================

export const role = pgTable(
  "role",
  {
    id: serial("id").primaryKey(),
    companyId: integer("company_id")
      .notNull()
      .references(() => company.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description"),
    isSystem: boolean("is_system").default(false),
    level: integer("level").default(0), // 0-100, higher = more privileges
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    unique("role_company_name").on(t.companyId, t.name),
    index("role_company_idx").on(t.companyId),
    index("role_level_idx").on(t.level),
  ],
);


export const permission = pgTable(
  "permission",
  {
    id: serial("id").primaryKey(),
    resource: text("resource").notNull(), // employee, leave, payroll, etc.
    action: text("action").notNull(), // create, read, update, delete, approve
    description: text("description"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [
    unique("permission_resource_action").on(t.resource, t.action),
    index("permission_resource_idx").on(t.resource),
  ],
);

export const rolePermission = pgTable(
  "role_permission",
  {
    id: serial("id").primaryKey(),
    roleId: integer("role_id")
      .notNull()
      .references(() => role.id, { onDelete: "cascade" }),
    permissionId: integer("permission_id")
      .notNull()
      .references(() => permission.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [
    unique("role_permission_unique").on(t.roleId, t.permissionId),
    index("role_permission_role_idx").on(t.roleId),
  ],
);

export const userRole = pgTable(
  "user_role",
  {
    id: serial("id").primaryKey(),
    employeeId: integer("employee_id").notNull(),
    roleId: integer("role_id")
      .notNull()
      .references(() => role.id, { onDelete: "cascade" }),
    assignedBy: integer("assigned_by"),
    assignedAt: timestamp("assigned_at").notNull().defaultNow(),
    isActive: boolean("is_active").default(true),
  },
  (t) => [
    unique("user_role_unique").on(t.employeeId, t.roleId),
    index("user_role_employee_idx").on(t.employeeId),
  ],
);













