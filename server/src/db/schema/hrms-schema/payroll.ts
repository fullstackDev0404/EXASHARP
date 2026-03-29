import { boolean, date, decimal, index, integer, pgTable, serial, text, timestamp, unique } from "drizzle-orm/pg-core";
import { employee } from "./employee";
import { payrollStatusEnum } from "./enums";
import { company } from "./core";

// ============================================
// SALARY STRUCTURE
// ============================================

export const salaryStructure = pgTable(
  "salary_structure",
  {
    id: serial("id").primaryKey(),
    employeeId: integer("employee_id")
      .notNull()
      .references(() => employee.id, { onDelete: "cascade" }),
    basicSalary: decimal("basic_salary", { precision: 12, scale: 2 }).notNull(),
    effectiveFrom: date("effective_from").notNull(),
    effectiveTo: date("effective_to"),
    isCurrent: boolean("is_current").default(false),
    approvedById: integer("approved_by_id").references(() => employee.id),
    approvedAt: timestamp("approved_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    index("salary_employee_idx").on(t.employeeId),
    index("salary_effective_from_idx").on(t.effectiveFrom),
  ],
);


// ============================================
// BANK INFORMATION (Normalized)
// ============================================



export const bankInfo = pgTable(
  "bank_info",
  {
    id: serial("id").primaryKey(),
    employeeId: integer("employee_id")
      .notNull()
      .references(() => employee.id, { onDelete: "cascade" }),
    bankName: text("bank_name").notNull(),
    accountNo: text("account_no").notNull(),
    accountName: text("account_name"),
    branchName: text("branch_name"),
    routingNo: text("routing_no"),
    swiftCode: text("swift_code"),
    isPrimary: boolean("is_primary").default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    unique("bank_account_unique").on(t.employeeId, t.accountNo),
    index("bank_employee_idx").on(t.employeeId),
  ],
);


// ============================================
// ALLOWANCE & DEDUCTION TYPES
// ============================================

export const allowanceType = pgTable(
  "allowance_type",
  {
    id: serial("id").primaryKey(),
    companyId: integer("company_id")
      .notNull()
      .references(() => company.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    code: text("code").notNull(),
    description: text("description"),
    isFixed: boolean("is_fixed").default(true),
    isTaxable: boolean("is_taxable").default(true),
    calculationType: text("calculation_type"), // fixed, percentage
    calculationValue: decimal("calculation_value"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    unique("allowance_company_code").on(t.companyId, t.code),
    index("allowance_company_idx").on(t.companyId),
  ],
);

export const deductionType = pgTable(
  "deduction_type",
  {
    id: serial("id").primaryKey(),
    companyId: integer("company_id")
      .notNull()
      .references(() => company.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    code: text("code").notNull(),
    description: text("description"),
    isMandatory: boolean("is_mandatory").default(false),
    isTaxable: boolean("is_taxable").default(false),
    calculationType: text("calculation_type"), // fixed, percentage
    calculationValue: decimal("calculation_value"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    unique("deduction_company_code").on(t.companyId, t.code),
    index("deduction_company_idx").on(t.companyId),
  ],
);

// ============================================
// EMPLOYEE COMPENSATION (Dynamic)
// ============================================

export const employeeAllowance = pgTable(
  "employee_allowance",
  {
    id: serial("id").primaryKey(),
    employeeId: integer("employee_id")
      .notNull()
      .references(() => employee.id, { onDelete: "cascade" }),
    allowanceTypeId: integer("allowance_type_id")
      .notNull()
      .references(() => allowanceType.id),
    amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
    effectiveFrom: date("effective_from").notNull(),
    effectiveTo: date("effective_to"),
    isRecurring: boolean("is_recurring").default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    index("emp_allowance_employee_idx").on(t.employeeId),
    index("emp_allowance_effective_idx").on(t.effectiveFrom),
  ],
);

export const employeeDeduction = pgTable(
  "employee_deduction",
  {
    id: serial("id").primaryKey(),
    employeeId: integer("employee_id")
      .notNull()
      .references(() => employee.id, { onDelete: "cascade" }),
    deductionTypeId: integer("deduction_type_id")
      .notNull()
      .references(() => deductionType.id),
    amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
    effectiveFrom: date("effective_from").notNull(),
    effectiveTo: date("effective_to"),
    isRecurring: boolean("is_recurring").default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    index("emp_deduction_employee_idx").on(t.employeeId),
    index("emp_deduction_effective_idx").on(t.effectiveFrom),
  ],
);


// ============================================
// PAYROLL (With detailed items)
// ============================================

export const payroll = pgTable(
  "payroll",
  {
    id: serial("id").primaryKey(),
    companyId: integer("company_id")
      .notNull()
      .references(() => company.id, { onDelete: "cascade" }),
    employeeId: integer("employee_id")
      .notNull()
      .references(() => employee.id, { onDelete: "cascade" }),
    month: integer("month").notNull(),
    year: integer("year").notNull(),
    basicSalary: decimal("basic_salary", { precision: 12, scale: 2 }).notNull(),
    totalAllowances: decimal("total_allowances", { precision: 12, scale: 2 })
      .notNull()
      .default("0"),
    totalDeductions: decimal("total_deductions", { precision: 12, scale: 2 })
      .notNull()
      .default("0"),
    netSalary: decimal("net_salary", { precision: 12, scale: 2 }).notNull(),
    bonus: decimal("bonus", { precision: 12, scale: 2 }).default("0"),
    overtimePay: decimal("overtime_pay", { precision: 12, scale: 2 }).default(
      "0",
    ),
    taxAmount: decimal("tax_amount", { precision: 12, scale: 2 }).default("0"),
    paymentDate: date("payment_date"),
    paymentMethod: text("payment_method"),
    transactionId: text("transaction_id"),
    status: payrollStatusEnum("status").notNull().default("pending"),
    processedBy: integer("processed_by").references(() => employee.id),
    processedAt: timestamp("processed_at"),
    remarks: text("remarks"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    unique("payroll_emp_month_year").on(t.employeeId, t.month, t.year),
    index("payroll_employee_idx").on(t.employeeId),
    index("payroll_month_year_idx").on(t.month, t.year),
    index("payroll_status_idx").on(t.status),
    index("payroll_company_idx").on(t.companyId),
  ],
);

export const payrollItem = pgTable(
  "payroll_item",
  {
    id: serial("id").primaryKey(),
    payrollId: integer("payroll_id")
      .notNull()
      .references(() => payroll.id, { onDelete: "cascade" }),
    type: text("type").notNull(), // allowance, deduction, bonus, overtime
    referenceId: integer("reference_id"), // allowanceTypeId or deductionTypeId
    name: text("name").notNull(),
    amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
    isTaxable: boolean("is_taxable").default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [
    index("payroll_item_payroll_idx").on(t.payrollId),
    index("payroll_item_type_idx").on(t.type),
  ],
);
