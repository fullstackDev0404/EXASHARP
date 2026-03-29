// ============================================
// SHIFT MANAGEMENT
// ============================================

import { boolean, date, decimal, index, integer, json, pgTable, serial, text, timestamp, unique } from "drizzle-orm/pg-core";
import { company } from "./core";
import { employee } from "./employee";
import { attendanceSourceEnum, attendanceStatusEnum, genderEnum, leaveStatusEnum, leaveTypeEnum } from "./enums";

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



// ============================================
// ATTENDANCE (Enhanced)
// ============================================

export const attendance = pgTable(
  "attendance",
  {
    id: serial("id").primaryKey(),
    employeeId: integer("employee_id")
      .notNull()
      .references(() => employee.id, { onDelete: "cascade" }),
    date: date("date").notNull(),
    shiftId: integer("shift_id").references(() => shift.id),
    status: attendanceStatusEnum("status").notNull(),
    checkIn: timestamp("check_in"),
    checkOut: timestamp("check_out"),
    checkInLocation: json("check_in_location"), // {lat, lng, address}
    checkOutLocation: json("check_out_location"),
    checkInDevice: text("check_in_device"),
    checkOutDevice: text("check_out_device"),
    source: attendanceSourceEnum("source").default("manual"),
    workingHours: integer("working_hours"), // in minutes
    overtimeHours: integer("overtime_hours"), // in minutes
    lateMinutes: integer("late_minutes").default(0),
    earlyExitMinutes: integer("early_exit_minutes").default(0),
    remarks: text("remarks"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    unique("attendance_emp_date_unique").on(t.employeeId, t.date),
    index("attendance_emp_date_idx").on(t.employeeId, t.date),
    index("attendance_status_idx").on(t.status),
    index("attendance_date_idx").on(t.date),
  ],
);

// ============================================
// LEAVE TYPE
// ============================================

export const leaveType = pgTable(
  "leave_type",
  {
    id: serial("id").primaryKey(),
    companyId: integer("company_id")
      .notNull()
      .references(() => company.id, { onDelete: "cascade" }),
    name: leaveTypeEnum("name").notNull(),
    maxDaysPerYear: integer("max_days_per_year"),
    isPaid: boolean("is_paid").default(true),
    requiresApproval: boolean("requires_approval").default(true),
    carryForward: boolean("carry_forward").default(false),
    maxCarryForwardDays: integer("max_carry_forward_days"),
    applicableGender: genderEnum("applicable_gender"), // null = all
    minServiceMonths: integer("min_service_months").default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    unique("leave_type_company_name").on(t.companyId, t.name),
    index("leave_type_company_idx").on(t.companyId),
  ],
);

// ============================================
// LEAVE
// ============================================

export const leave = pgTable(
  "leave",
  {
    id: serial("id").primaryKey(),
    companyId: integer("company_id")
      .notNull()
      .references(() => company.id, { onDelete: "cascade" }),
    employeeId: integer("employee_id")
      .notNull()
      .references(() => employee.id, { onDelete: "cascade" }),
    leaveTypeId: integer("leave_type_id")
      .notNull()
      .references(() => leaveType.id),
    startDate: date("start_date").notNull(),              // Then export them
    endDate: date("end_date").notNull(),
    days: decimal("days", { precision: 4, scale: 1 }).notNull(),
    reason: text("reason"),
    status: leaveStatusEnum("status").notNull().default("pending"),
    approvedById: integer("approved_by_id").references(() => employee.id),
    approvedAt: timestamp("approved_at"),
    rejectionReason: text("rejection_reason"),
    attachments: json("attachments"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    index("leave_employee_idx").on(t.employeeId),
    index("leave_type_idx").on(t.leaveTypeId),
    index("leave_status_idx").on(t.status),
    index("leave_dates_idx").on(t.startDate, t.endDate),
    index("leave_company_idx").on(t.companyId),
  ],
);

// ============================================
// LEAVE BALANCE
// ============================================

export const leaveBalance = pgTable(
  "leave_balance",
  {
    id: serial("id").primaryKey(),
    employeeId: integer("employee_id")
      .notNull()
      .references(() => employee.id, { onDelete: "cascade" }),
    leaveTypeId: integer("leave_type_id")
      .notNull()
      .references(() => leaveType.id),
    year: integer("year").notNull(),
    totalDays: decimal("total_days", { precision: 5, scale: 1 }).notNull(),
    usedDays: decimal("used_days", { precision: 5, scale: 1 })
      .notNull()
      .default("0"),
    pendingDays: decimal("pending_days", { precision: 5, scale: 1 })
      .notNull()
      .default("0"),
    carriedOverDays: decimal("carried_over_days", {
      precision: 5,
      scale: 1,
    }).default("0"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    unique("leave_balance_emp_year_type").on(
      t.employeeId,
      t.year,
      t.leaveTypeId,
    ),
    index("leave_balance_employee_idx").on(t.employeeId),
    index("leave_balance_year_idx").on(t.year),
  ],
);
