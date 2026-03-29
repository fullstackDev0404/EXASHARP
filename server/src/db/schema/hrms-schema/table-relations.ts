// ============================================
// RELATIONS (Complete)
// ============================================

import { relations } from "drizzle-orm";
import { company, permission, role, rolePermission, userRole } from "./core";
import { address, education, emergencyContact, employee, experience, document, positionHistory, salaryHistory, contract } from "./employee";
import { training, trainingParticipant, resignation, exitClearance } from "./development";
import { shift, leaveType, attendance, leave, leaveBalance, employeeShift } from "./attendance";
import { department, position } from "./organization";
import { allowanceType, deductionType, bankInfo, payroll, salaryStructure, employeeAllowance, employeeDeduction, payrollItem } from "./payroll";
import { performanceReview, kpi, employeeKpi } from "./performance";
import { notification } from "./system";
import { jobPost, applicant, interview } from "./recruitment";
import { asset } from "./assets";

export const companyRelations = relations(company, ({ many }) => ({
  employees: many(employee),
  departments: many(department),
  positions: many(position),
  roles: many(role),
  shifts: many(shift),
  leaveTypes: many(leaveType),
  allowanceTypes: many(allowanceType),
  deductionTypes: many(deductionType),
  jobPosts: many(jobPost),
  assets: many(asset),
  trainings: many(training),
  notifications: many(notification),
}));

export const employeeRelations = relations(employee, ({ one, many }) => ({
  company: one(company, {
    fields: [employee.companyId],
    references: [company.id],
  }),
  position: one(position, {
    fields: [employee.positionId],
    references: [position.id],
  }),
  department: one(department, {
    fields: [employee.departmentId],
    references: [department.id],
  }),
  reportingManager: one(employee, {
    fields: [employee.reportingManagerId],
    references: [employee.id],
    relationName: "manager_relations",
  }),
  subordinates: many(employee, {
    relationName: "manager_relations",
  }),
  roles: many(userRole),
  addresses: many(address),
  educations: many(education),
  experiences: many(experience),
  documents: many(document),
  emergencyContacts: many(emergencyContact),
  bankInfo: many(bankInfo),
  contracts: many(contract),
  attendances: many(attendance),
  leaves: many(leave, {
    relationName: "employee_leaves", // ✅ MATCH THIS
  }),
  leaveBalances: many(leaveBalance),
  payrolls: many(payroll),
  salaryStructures: many(salaryStructure),
  employeeAllowances: many(employeeAllowance),
  employeeDeductions: many(employeeDeduction),
  performanceReviews: many(performanceReview, {
    relationName: "reviewee", // ✅ match this
  }),
  notifications: many(notification),
  assignedAssets: many(asset, {
    relationName: "assigned_assets",
  }),
  trainingParticipants: many(trainingParticipant),
  resignation: many(resignation, {
    relationName: "employee_resignation",
  }),
  manager: one(employee, {
    fields: [employee.reportingManagerId],
    references: [employee.id],
    relationName: "manager_reports",
  }),

  reports: many(employee, {
    relationName: "manager_reports",
  }),

  // Fix these (relationName mismatch)
  // leaves: many(leave),               // ← remove relationName or match it
  performanceReviewsAsReviewee: many(performanceReview, { relationName: "reviewee" }),
  performanceReviewsAsReviewer: many(performanceReview, { relationName: "reviewer" }),
}));

export const departmentRelations = relations(department, ({ one, many }) => ({
  company: one(company, {
    fields: [department.companyId],
    references: [company.id],
  }),
  manager: one(employee, {
    fields: [department.managerId],
    references: [employee.id],
  }),
  parentDepartment: one(department, {
    fields: [department.parentDepartmentId],
    references: [department.id],
    relationName: "department_hierarchy",
  }),
  subDepartments: many(department, {
    relationName: "department_hierarchy",
  }),
  employees: many(employee),
  positions: many(position),
}));

export const roleRelations = relations(role, ({ one, many }) => ({
  company: one(company, {
    fields: [role.companyId],
    references: [company.id],
  }),
  permissions: many(rolePermission),
  users: many(userRole),
}));

export const permissionRelations = relations(permission, ({ many }) => ({
  roles: many(rolePermission),
}));

export const rolePermissionRelations = relations(rolePermission, ({ one }) => ({
  role: one(role, {
    fields: [rolePermission.roleId],
    references: [role.id],
  }),
  permission: one(permission, {
    fields: [rolePermission.permissionId],
    references: [permission.id],
  }),
}));

export const userRoleRelations = relations(userRole, ({ one }) => ({
  employee: one(employee, {
    fields: [userRole.employeeId],
    references: [employee.id],
  }),
  role: one(role, {
    fields: [userRole.roleId],
    references: [role.id],
  }),
}));

export const positionRelations = relations(position, ({ one }) => ({
  company: one(company, {
    fields: [position.companyId],
    references: [company.id],
  }),
  // If you have department relation too:
  department: one(department, {
    fields: [position.departmentId],
    references: [department.id],
  }),
}));

export const shiftRelations = relations(shift, ({ one, many }) => ({
  company: one(company, {
    fields: [shift.companyId],
    references: [company.id],
  }),
  employeeShifts: many(employeeShift), // Add this
}));

export const allowanceTypeRelations = relations(allowanceType, ({ one }) => ({
  company: one(company, {
    fields: [allowanceType.companyId],
    references: [company.id],
  }),
}));

export const deductionTypeRelations = relations(deductionType, ({ one }) => ({
  company: one(company, {
    fields: [deductionType.companyId],
    references: [company.id],
  }),
}));

export const jobPostRelations = relations(jobPost, ({ one }) => ({
  company: one(company, {
    fields: [jobPost.companyId],
    references: [company.id],
  }),
}));

export const trainingRelations = relations(training, ({ one }) => ({
  company: one(company, {
    fields: [training.companyId],
    references: [company.id],
  }),
}));

export const addressRelations = relations(address, ({ one }) => ({
  employee: one(employee, {
    fields: [address.employeeId],
    references: [employee.id],
  }),
}));

export const educationRelations = relations(education, ({ one }) => ({
  employee: one(employee, {
    fields: [education.employeeId],
    references: [employee.id],
  }),
}));

export const experienceRelations = relations(experience, ({ one }) => ({
  employee: one(employee, {
    fields: [experience.employeeId],
    references: [employee.id],
  }),
}));

export const documentRelations = relations(document, ({ one }) => ({
  employee: one(employee, {
    fields: [document.employeeId],
    references: [employee.id],
  }),
}));

export const emergencyContactRelations = relations(
  emergencyContact,
  ({ one }) => ({
    employee: one(employee, {
      fields: [emergencyContact.employeeId],
      references: [employee.id],
    }),
  }),
);

export const bankInfoRelations = relations(bankInfo, ({ one }) => ({
  employee: one(employee, {
    fields: [bankInfo.employeeId],
    references: [employee.id],
  }),
}));

export const contractRelations = relations(contract, ({ one }) => ({
  employee: one(employee, {
    fields: [contract.employeeId],
    references: [employee.id],
  }),
}));

export const salaryStructureRelations = relations(
  salaryStructure,
  ({ one }) => ({
    employee: one(employee, {
      fields: [salaryStructure.employeeId],
      references: [employee.id],
    }),
  }),
);

// Add all these missing relations

export const attendanceRelations = relations(attendance, ({ one }) => ({
  employee: one(employee, {
    fields: [attendance.employeeId],
    references: [employee.id],
  }),
  shift: one(shift, {
    fields: [attendance.shiftId],
    references: [shift.id],
  }),
}));

export const payrollRelations = relations(payroll, ({ one }) => ({
  employee: one(employee, {
    fields: [payroll.employeeId],
    references: [employee.id],
  }),
  company: one(company, {
    fields: [payroll.companyId],
    references: [company.id],
  }),
}));

export const performanceReviewRelations = relations(
  performanceReview,
  ({ one }) => ({
    employee: one(employee, {
      fields: [performanceReview.employeeId],
      references: [employee.id],
      relationName: "reviewee",
    }),
    reviewer: one(employee, {
      fields: [performanceReview.reviewerId],
      references: [employee.id],
      relationName: "reviewer",
    }),
  }),
);

export const notificationRelations = relations(notification, ({ one }) => ({
  employee: one(employee, {
    fields: [notification.employeeId],
    references: [employee.id],
  }),
  company: one(company, {
    fields: [notification.companyId],
    references: [company.id],
  }),
}));

export const assetRelations = relations(asset, ({ one }) => ({
  company: one(company, {
    fields: [asset.companyId],
    references: [company.id],
  }),
  assignedTo: one(employee, {
    fields: [asset.assignedTo],
    references: [employee.id],
    relationName: "assigned_assets",
  }),
}));

export const trainingParticipantRelations = relations(
  trainingParticipant,
  ({ one }) => ({
    employee: one(employee, {
      fields: [trainingParticipant.employeeId],
      references: [employee.id],
    }),
    training: one(training, {
      fields: [trainingParticipant.trainingId],
      references: [training.id],
    }),
  }),
);

export const resignationRelations = relations(resignation, ({ one }) => ({
  employee: one(employee, {
    fields: [resignation.employeeId],
    references: [employee.id],
    relationName: "employee_resignation", // ✅ ADD
  }),
  approvedBy: one(employee, {
    fields: [resignation.approvedById],
    references: [employee.id],
    relationName: "resignation_approver",
  }),
}));

export const employeeAllowanceRelations = relations(
  employeeAllowance,
  ({ one }) => ({
    employee: one(employee, {
      fields: [employeeAllowance.employeeId],
      references: [employee.id],
    }),
    allowanceType: one(allowanceType, {
      fields: [employeeAllowance.allowanceTypeId],
      references: [allowanceType.id],
    }),
  }),
);

export const employeeDeductionRelations = relations(
  employeeDeduction,
  ({ one }) => ({
    employee: one(employee, {
      fields: [employeeDeduction.employeeId],
      references: [employee.id],
    }),
    deductionType: one(deductionType, {
      fields: [employeeDeduction.deductionTypeId],
      references: [deductionType.id],
    }),
  }),
);

export const employeeShiftRelations = relations(employeeShift, ({ one }) => ({
  employee: one(employee, {
    fields: [employeeShift.employeeId],
    references: [employee.id],
  }),
  shift: one(shift, {
    fields: [employeeShift.shiftId],
    references: [shift.id],
  }),
}));

export const positionHistoryRelations = relations(
  positionHistory,
  ({ one }) => ({
    employee: one(employee, {
      fields: [positionHistory.employeeId],
      references: [employee.id],
    }),
    position: one(position, {
      fields: [positionHistory.positionId],
      references: [position.id],
    }),
  }),
);

export const salaryHistoryRelations = relations(salaryHistory, ({ one }) => ({
  employee: one(employee, {
    fields: [salaryHistory.employeeId],
    references: [employee.id],
  }),
}));

// Leave Type Relations
export const leaveTypeRelations = relations(leaveType, ({ one, many }) => ({
  company: one(company, {
    fields: [leaveType.companyId],
    references: [company.id],
  }),
  leaves: many(leave),
  leaveBalances: many(leaveBalance),
}));

// Leave Relations
export const leaveRelations = relations(leave, ({ one }) => ({
  employee: one(employee, {
    fields: [leave.employeeId],
    references: [employee.id],
    relationName: "employee_leaves", // ✅ ADD THIS
  }),
  approvedBy: one(employee, {
    fields: [leave.approvedById],
    references: [employee.id],
    relationName: "leave_approver",
  }),
  leaveType: one(leaveType, {
    fields: [leave.leaveTypeId],
    references: [leaveType.id],
  }),
  company: one(company, {
    fields: [leave.companyId],
    references: [company.id],
  }),
}));

// Leave Balance Relations
export const leaveBalanceRelations = relations(leaveBalance, ({ one }) => ({
  employee: one(employee, {
    fields: [leaveBalance.employeeId],
    references: [employee.id],
  }),
  leaveType: one(leaveType, {
    fields: [leaveBalance.leaveTypeId],
    references: [leaveType.id],
  }),
}));

// And similarly for employeeAllowance, employeeDeduction, etc.

export const kpiRelations = relations(kpi, ({ one, many }) => ({
  company: one(company, {
    fields: [kpi.companyId],
    references: [company.id],
  }),
  employeeKpis: many(employeeKpi),
}));

export const applicantRelations = relations(applicant, ({ one, many }) => ({
  company: one(company, {
    fields: [applicant.companyId],
    references: [company.id],
  }),
  jobPost: one(jobPost, {
    fields: [applicant.jobPostId],
    references: [jobPost.id],
  }),
  interviews: many(interview),
}));

export const interviewRelations = relations(interview, ({ one }) => ({
  applicant: one(applicant, {
    fields: [interview.applicantId],
    references: [applicant.id],
  }),
  interviewer: one(employee, {
    fields: [interview.interviewerId],
    references: [employee.id],
  }),
}));

export const exitClearanceRelations = relations(exitClearance, ({ one }) => ({
  resignation: one(resignation, {
    fields: [exitClearance.resignationId],
    references: [resignation.id],
  }),
  clearedBy: one(employee, {
    fields: [exitClearance.clearedBy],
    references: [employee.id],
  }),
}));

export const payrollItemRelations = relations(payrollItem, ({ one }) => ({
  payroll: one(payroll, {
    fields: [payrollItem.payrollId],
    references: [payroll.id],
  }),
}));

export const employeeKpiRelations = relations(employeeKpi, ({ one }) => ({
  review: one(performanceReview, {
    fields: [employeeKpi.reviewId],
    references: [performanceReview.id],
  }),
  kpi: one(kpi, {
    fields: [employeeKpi.kpiId],
    references: [kpi.id],
  }),
}));


// Add more relations as needed...

