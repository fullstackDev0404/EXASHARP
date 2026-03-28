// ============================================
// ENUMS
// ============================================

import { pgEnum } from "drizzle-orm/pg-core";

export const resignationStatusEnum = pgEnum("resignation_status", [
  "pending",
  "approved",
  "rejected",
  "cancelled",
  "withdrawn",
]);

export const reviewStatusEnum = pgEnum("review_status", [
  "pending",
  "in_progress",
  "completed",
  "cancelled",
]);

export const interviewStatusEnum = pgEnum("interview_status", [
  "scheduled",
  "completed",
  "cancelled",
  "no_show",
  "rescheduled",
]);

export const priorityEnum = pgEnum("priority_level", [
  "low",
  "normal",
  "high",
  "urgent",
]);

export const clearanceStatusEnum = pgEnum("clearance_status", [
  "pending",
  "cleared",
  "rejected",
]);

export const maritalStatusEnum = pgEnum("marital_status", [
  "single",
  "married",
  "divorced",
  "widowed",
]);

export const bloodGroupEnum = pgEnum("blood_group", [
  "A+",
  "A-",
  "B+",
  "B-",
  "O+",
  "O-",
  "AB+",
  "AB-",
]);

export const genderEnum = pgEnum("gender", ["male", "female", "other"]);

export const leaveStatusEnum = pgEnum("leave_status", [
  "pending",
  "approved",
  "rejected",
  "cancelled",
]);

export const attendanceStatusEnum = pgEnum("attendance_status", [
  "present",
  "absent",
  "late",
  "half_day",
  "leave",
]);

export const attendanceSourceEnum = pgEnum("attendance_source", [
  "biometric",
  "manual",
  "api",
  "mobile",
  "web",
]);

export const leaveTypeEnum = pgEnum("leave_type_enum", [
  "annual",
  "sick",
  "maternity",
  "paternity",
  "casual",
  "unpaid",
  "bereavement",
  "study",
]);

export const payrollStatusEnum = pgEnum("payroll_status", [
  "pending",
  "processing",
  "paid",
  "failed",
  "cancelled",
]);

export const documentTypeEnum = pgEnum("document_type", [
  "nid",
  "passport",
  "cv",
  "certificate",
  "photo",
  "contract",
  "offer_letter",
  "other",
]);

export const addressTypeEnum = pgEnum("address_type", [
  "present",
  "permanent",
  "mailing",
  "emergency",
]);

export const contractTypeEnum = pgEnum("contract_type", [
  "permanent",
  "contractual",
  "intern",
  "probation",
  "consultant",
]);

export const auditActionEnum = pgEnum("audit_action", [
  "INSERT",
  "UPDATE",
  "DELETE",
  "SOFT_DELETE",
  "RESTORE",
]);

export const applicationStatusEnum = pgEnum("application_status", [
  "draft",
  "submitted",
  "reviewing",
  "shortlisted",
  "interviewed",
  "offered",
  "hired",
  "rejected",
]);

export const interviewTypeEnum = pgEnum("interview_type", [
  "phone",
  "video",
  "onsite",
  "technical",
  "hr",
]);

export const assetStatusEnum = pgEnum("asset_status", [
  "available",
  "assigned",
  "maintenance",
  "damaged",
  "retired",
]);

export const trainingStatusEnum = pgEnum("training_status", [
  "scheduled",
  "ongoing",
  "completed",
  "cancelled",
]);
