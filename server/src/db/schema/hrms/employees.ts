// ============================================
// EMPLOYEE (Complete with all fields)
// ============================================

import { genderEnum, bloodGroupEnum, maritalStatusEnum } from "./enums";

import { company } from "./core";

import { boolean, date, index, integer, pgTable, serial, text, timestamp, unique } from "drizzle-orm/pg-core";
import { department, position } from "./organization";

export const employee = pgTable(
  "employee",
  {
    id: serial("id").primaryKey(),
    companyId: integer("company_id")
      .notNull()
      .references(() => company.id, { onDelete: "cascade" }),
    employeeCode: text("employee_code").notNull(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    personalEmail: text("personal_email"),
    idNo: text("id_no").notNull(),
    passportNo: text("passport_no"),
    positionId: integer("position_id")
      .notNull()
      .references(() => position.id, { onDelete: "restrict" }),
    departmentId: integer("department_id").references(() => department.id, {
      onDelete: "set null",
    }),
    reportingManagerId: integer("reporting_manager_id"),
    joiningDate: date("joining_date").notNull(),
    confirmationDate: date("confirmation_date"),
    dateOfBirth: date("date_of_birth").notNull(),
    gender: genderEnum("gender"),
    religion: text("religion"),
    nationality: text("nationality").notNull(),
    contactNo: text("contact_no").notNull(),
    alternateContactNo: text("alternate_contact_no"),
    bloodGroup: bloodGroupEnum("blood_group"),
    maritalStatus: maritalStatusEnum("marital_status"),
    fatherName: text("father_name"),
    motherName: text("mother_name"),
    spouseName: text("spouse_name"),
    isActive: boolean("is_active").notNull().default(true),
    deletedAt: timestamp("deleted_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    unique("employee_company_code").on(t.companyId, t.employeeCode),
    unique("employee_company_email").on(t.companyId, t.email),
    unique("employee_company_id_no").on(t.companyId, t.idNo),
    index("employee_email_idx").on(t.email),
    index("employee_code_idx").on(t.employeeCode),
    index("employee_position_idx").on(t.positionId),
    index("employee_department_idx").on(t.departmentId),
    index("employee_manager_idx").on(t.reportingManagerId),
    index("employee_company_idx").on(t.companyId),
  ],
);