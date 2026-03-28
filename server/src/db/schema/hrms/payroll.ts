import { boolean, date, decimal, index, integer, pgTable, serial, text, timestamp, unique } from "drizzle-orm/pg-core";
import { employee } from "./employees";

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