import {
  genderEnum,
  bloodGroupEnum,
  maritalStatusEnum,
  documentTypeEnum,
  addressTypeEnum,
  contractTypeEnum,
} from "./enums";

import { company } from "./core";

import {
  boolean,
  date,
  decimal,
  index,
  integer,
  json,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";
import { department, position } from "./organization";
import { user } from "../auth-schema";

// ============================================
// EMPLOYEE (Complete with all fields)
// ============================================

export const employee = pgTable(
  "employee",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
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
    unique("employee_user").on(t.userId),
    index("employee_email_idx").on(t.email),
    index("employee_code_idx").on(t.employeeCode),
    index("employee_position_idx").on(t.positionId),
    index("employee_department_idx").on(t.departmentId),
    index("employee_manager_idx").on(t.reportingManagerId),
    index("employee_company_idx").on(t.companyId),
    index("employee_user_idx").on(t.userId),
  ],
);

// ============================================
// EXPERIENCE
// ============================================

export const experience = pgTable(
  "experience",
  {
    id: serial("id").primaryKey(),
    employeeId: integer("employee_id")
      .notNull()
      .references(() => employee.id, { onDelete: "cascade" }),
    company: text("company").notNull(),
    position: text("position").notNull(),
    startDate: date("start_date").notNull(),
    endDate: date("end_date"),
    isCurrent: boolean("is_current").default(false),
    description: text("description"),
    responsibilities: json("responsibilities"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    index("experience_employee_idx").on(t.employeeId),
    index("experience_company_idx").on(t.company),
  ],
);

// ============================================
// DOCUMENT
// ============================================

export const document = pgTable(
  "document",
  {
    id: serial("id").primaryKey(),
    employeeId: integer("employee_id")
      .notNull()
      .references(() => employee.id, { onDelete: "cascade" }),
    documentType: documentTypeEnum("document_type").notNull(),
    documentPath: text("document_path").notNull(),
    fileName: text("file_name").notNull(),
    fileSize: integer("file_size"),
    mimeType: text("mime_type"),
    description: text("description"),
    uploadedBy: integer("uploaded_by").references(() => employee.id),
    isVerified: boolean("is_verified").default(false),
    verifiedBy: integer("verified_by").references(() => employee.id),
    verifiedAt: timestamp("verified_at"),
    expiresAt: timestamp("expires_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    index("document_employee_idx").on(t.employeeId),
    index("document_type_idx").on(t.documentType),
  ],
);

// ============================================
// ADDRESS (With company support)
// ============================================

export const address = pgTable(
  "address",
  {
    id: serial("id").primaryKey(),
    employeeId: integer("employee_id")
      .notNull()
      .references(() => employee.id, { onDelete: "cascade" }),
    type: addressTypeEnum("type").notNull().default("present"),
    street: text("street").notNull(),
    city: text("city").notNull(),
    policeStation: text("police_station"),
    postOffice: text("post_office"),
    state: text("state"),
    postalCode: text("postal_code"),
    country: text("country").notNull().default("Bangladesh"),
    isPrimary: boolean("is_primary").default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    index("address_employee_idx").on(t.employeeId),
    index("address_type_idx").on(t.type),
  ],
);

// ============================================
// EDUCATION
// ============================================

export const education = pgTable(
  "education",
  {
    id: serial("id").primaryKey(),
    employeeId: integer("employee_id")
      .notNull()
      .references(() => employee.id, { onDelete: "cascade" }),
    institution: text("institution").notNull(),
    degree: text("degree").notNull(),
    fieldOfStudy: text("field_of_study"),
    result: text("result"),
    startDate: date("start_date").notNull(),
    endDate: date("end_date"),
    isHighest: boolean("is_highest").default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    index("education_employee_idx").on(t.employeeId),
    index("education_degree_idx").on(t.degree),
  ],
);

// ============================================
// EMERGENCY CONTACT (Normalized)
// ============================================

export const emergencyContact = pgTable(
  "emergency_contact",
  {
    id: serial("id").primaryKey(),
    employeeId: integer("employee_id")
      .notNull()
      .references(() => employee.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    relationship: text("relationship").notNull(),
    contactNo: text("contact_no").notNull(),
    alternateContactNo: text("alternate_contact_no"),
    email: text("email"),
    address: text("address"),
    priority: integer("priority").default(1),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [index("emergency_employee_idx").on(t.employeeId)],
);

// ============================================
// HISTORY TABLES
// ============================================

export const positionHistory = pgTable(
  "position_history",
  {
    id: serial("id").primaryKey(),
    employeeId: integer("employee_id")
      .notNull()
      .references(() => employee.id, { onDelete: "cascade" }),
    positionId: integer("position_id").notNull(),
    departmentId: integer("department_id"),
    changedAt: timestamp("changed_at").notNull().defaultNow(),
    changedById: integer("changed_by_id").references(() => employee.id),
    reason: text("reason"),
    effectiveDate: date("effective_date").notNull(),
  },
  (t) => [
    index("pos_history_employee_idx").on(t.employeeId),
    index("pos_history_effective_idx").on(t.effectiveDate),
  ],
);

export const salaryHistory = pgTable(
  "salary_history",
  {
    id: serial("id").primaryKey(),
    employeeId: integer("employee_id")
      .notNull()
      .references(() => employee.id, { onDelete: "cascade" }),
    oldSalary: decimal("old_salary", { precision: 12, scale: 2 }),
    newSalary: decimal("new_salary", { precision: 12, scale: 2 }).notNull(),
    effectiveFrom: date("effective_from").notNull(),
    changedAt: timestamp("changed_at").notNull().defaultNow(),
    changedById: integer("changed_by_id").references(() => employee.id),
    reason: text("reason"),
    approvalStatus: text("approval_status").default("approved"),
  },
  (t) => [
    index("salary_history_employee_idx").on(t.employeeId),
    index("salary_history_effective_idx").on(t.effectiveFrom),
  ],
);

// ============================================
// CONTRACT MANAGEMENT
// ============================================

export const contract = pgTable(
  "contract",
  {
    id: serial("id").primaryKey(),
    employeeId: integer("employee_id")
      .notNull()
      .references(() => employee.id, { onDelete: "cascade" }),
    contractType: contractTypeEnum("contract_type").notNull(),
    startDate: date("start_date").notNull(),
    endDate: date("end_date"),
    probationPeriod: integer("probation_period"), // in days
    noticePeriod: integer("notice_period"), // in days
    salary: integer("salary"),
    documentPath: text("document_path"),
    isActive: boolean("is_active").default(true),
    signedBy: integer("signed_by").references(() => employee.id),
    signedAt: timestamp("signed_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    index("contract_employee_idx").on(t.employeeId),
    index("contract_dates_idx").on(t.startDate, t.endDate),
  ],
);
