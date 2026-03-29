
// ============================================
// RECRUITMENT MODULE
// ============================================

import { boolean, decimal, index, integer, json, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { company } from "./core";
import { department, position } from "./organization";
import { employee } from "./employee";
import { applicationStatusEnum, interviewTypeEnum } from "./enums";

export const jobPost = pgTable(
  "job_post",
  {
    id: serial("id").primaryKey(),
    companyId: integer("company_id")
      .notNull()
      .references(() => company.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    departmentId: integer("department_id").references(() => department.id),
    positionId: integer("position_id").references(() => position.id),
    description: text("description"),
    requirements: json("requirements"),
    responsibilities: json("responsibilities"),
    location: text("location"),
    employmentType: text("employment_type"), // full-time, part-time, contract
    experienceRequired: text("experience_required"),
    salaryRange: json("salary_range"),
    postedBy: integer("posted_by").references(() => employee.id),
    postedAt: timestamp("posted_at").defaultNow(),
    expiresAt: timestamp("expires_at"),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    index("job_post_company_idx").on(t.companyId),
    index("job_post_title_idx").on(t.title),
    index("job_post_status_idx").on(t.isActive),
  ],
);

export const applicant = pgTable(
  "applicant",
  {
    id: serial("id").primaryKey(),
    companyId: integer("company_id")
      .notNull()
      .references(() => company.id, { onDelete: "cascade" }),
    jobPostId: integer("job_post_id").references(() => jobPost.id),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    resumePath: text("resume_path"),
    coverLetter: text("cover_letter"),
    expectedSalary: decimal("expected_salary", { precision: 12, scale: 2 }),
    currentCompany: text("current_company"),
    experienceYears: integer("experience_years"),
    status: applicationStatusEnum("status").default("draft"),
    appliedAt: timestamp("applied_at").defaultNow(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    index("applicant_job_idx").on(t.jobPostId),
    index("applicant_email_idx").on(t.email),
    index("applicant_status_idx").on(t.status),
    index("applicant_company_idx").on(t.companyId),
  ],
);

export const interview = pgTable(
  "interview",
  {
    id: serial("id").primaryKey(),
    applicantId: integer("applicant_id")
      .notNull()
      .references(() => applicant.id, { onDelete: "cascade" }),
    interviewerId: integer("interviewer_id").references(() => employee.id),
    interviewType: interviewTypeEnum("interview_type").notNull(),
    scheduledAt: timestamp("scheduled_at").notNull(),
    duration: integer("duration"), // minutes
    location: text("location"),
    meetingLink: text("meeting_link"),
    feedback: text("feedback"),
    rating: integer("rating"), // 1-5
    status: text("status").default("scheduled"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    index("interview_applicant_idx").on(t.applicantId),
    index("interview_interviewer_idx").on(t.interviewerId),
    index("interview_scheduled_idx").on(t.scheduledAt),
  ],
);
