

// ============================================
// TYPES
// ============================================

import type { InferSelectModel, InferInsertModel } from "drizzle-orm";

import { auditLog } from "./system";
import { attendance, leave } from "./attendance";
import { company, role, permission } from "./core";
import { employee } from "./employee";
import { department, position } from "./organization";
import { payroll } from "./payroll";
import { jobPost } from "./recruitment";
import { asset } from "./assets";
import { training } from "./development";

export type Company = InferSelectModel<typeof company>;
export type NewCompany = InferInsertModel<typeof company>;

export type Employee = InferSelectModel<typeof employee>;
export type NewEmployee = InferInsertModel<typeof employee>;

export type Department = InferSelectModel<typeof department>;
export type NewDepartment = InferInsertModel<typeof department>;

export type Position = InferSelectModel<typeof position>;
export type NewPosition = InferInsertModel<typeof position>;

export type Attendance = InferSelectModel<typeof attendance>;
export type NewAttendance = InferInsertModel<typeof attendance>;

export type Leave = InferSelectModel<typeof leave>;
export type NewLeave = InferInsertModel<typeof leave>;

export type Payroll = InferSelectModel<typeof payroll>;
export type NewPayroll = InferInsertModel<typeof payroll>;

export type Role = InferSelectModel<typeof role>;
export type NewRole = InferInsertModel<typeof role>;

export type Permission = InferSelectModel<typeof permission>;
export type NewPermission = InferInsertModel<typeof permission>;

export type AuditLog = InferSelectModel<typeof auditLog>;
export type NewAuditLog = InferInsertModel<typeof auditLog>;

export type JobPost = InferSelectModel<typeof jobPost>;
export type NewJobPost = InferInsertModel<typeof jobPost>;

export type Asset = InferSelectModel<typeof asset>;
export type NewAsset = InferInsertModel<typeof asset>;

export type Training = InferSelectModel<typeof training>;
export type NewTraining = InferInsertModel<typeof training>;


