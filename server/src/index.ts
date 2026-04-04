import { Elysia } from "elysia";
import { openapi } from "@elysiajs/openapi";
import { cors } from "@elysiajs/cors";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { auth } from "./lib/auth";
import {
  company,
  role,
  userRole,
  employee,
  department,
  position,
} from "./db/schema/hrms-schema";
import {
  employeeRelations,
  roleRelations,
} from "./db/schema/hrms-schema/table-relations";

const app = new Elysia()
  .use(openapi())
  .use(
    cors({
      origin: ["http://localhost:5173", "http://localhost:3000"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    }),
  )

  .decorate("db", db)
  .decorate("auth", auth)
  .get(
    "/",
    () => "This ERP system is under development and not yet production-ready.",
  )
  .get("/api/me", async (ctx) => {
    try {
      const session = await auth.api.getSession({
        headers: ctx.request.headers as any,
      });
      if (!session) {
        ctx.set.status = 401;
        return { error: "Unauthorized" };
      }

      const userCompanies = await db
        .select()
        .from(employee)
        .innerJoin(company, eq(employee.companyId, company.id))
        .leftJoin(role, eq(employee.id, role.id))
        .where(eq(employee.userId, session.user.id));

      return {
        user: session.user,
        companies: userCompanies,
      };
    } catch (error) {
      console.error("Session error:", error);
      ctx.set.status = 401;
      return { error: "Unauthorized" };
    }
  })
  .post("/api/company", async (ctx) => {
    try {
      const session = await auth.api.getSession({
        headers: ctx.request.headers as any,
      });
      if (!session) {
        ctx.set.status = 401;
        return { error: "Unauthorized" };
      }

      const body = await ctx.request.json();
      const {
        name,
        code,
        registrationNo,
        email,
        phone,
        address,
        city,
        state,
        country,
        postalCode,
      } = body;

      const existingCompany = await db
        .select()
        .from(company)
        .where(eq(company.code, code))
        .limit(1);

      if (existingCompany.length > 0) {
        ctx.set.status = 400;
        return { error: "Company with this code already exists" };
      }

      const newCompany = await db
        .insert(company)
        .values({
          name,
          code,
          registrationNo,
          email,
          phone,
          address,
          city,
          state,
          country: country || "Bangladesh",
          postalCode,
        })
        .returning();

      const companyId = newCompany[0].id;

      const adminRole = await db
        .insert(role)
        .values({
          companyId,
          name: "Company Admin",
          description: "Full access to company management",
          isSystem: true,
          level: 100,
        })
        .returning();

      const defaultDepartment = await db
        .insert(department)
        .values({
          companyId,
          name: "General",
          code: "GEN001",
          description: "Default department",
        })
        .returning();

      const defaultPosition = await db
        .insert(position)
        .values({
          companyId,
          departmentId: defaultDepartment[0].id,
          title: "Administrator",
          code: "ADMIN001",
          level: "senior",
        })
        .returning();

      const employeeRecord = await db
        .insert(employee)
        .values({
          userId: session.user.id,
          companyId,
          employeeCode: "EMP001",
          name: session.user.name,
          email: session.user.email,
          idNo: "N/A",
          positionId: defaultPosition[0].id,
          departmentId: defaultDepartment[0].id,
          joiningDate: new Date(),
          dateOfBirth: new Date("1990-01-01"),
          nationality: "Bangladeshi",
          contactNo: phone || "N/A",
        })
        .returning();

      await db.insert(userRole).values({
        employeeId: employeeRecord[0].id,
        roleId: adminRole[0].id,
      });

      return {
        company: newCompany[0],
        role: adminRole[0],
        employee: employeeRecord[0],
      };
    } catch (error) {
      console.error("Create company error:", error);
      ctx.set.status = 500;
      return { error: "Failed to create company" };
    }
  })
  .get("/api/companies", async (ctx) => {
    try {
      const session = await auth.api.getSession({
        headers: ctx.request.headers as any,
      });
      if (!session) {
        ctx.set.status = 401;
        return { error: "Unauthorized" };
      }

      const userEmployees = await db
        .select({
          employee: employee,
          company: company,
        })
        .from(employee)
        .innerJoin(company, eq(employee.companyId, company.id))
        .where(eq(employee.userId, session.user.id));

      return { companies: userEmployees };
    } catch (error) {
      console.error("Get companies error:", error);
      ctx.set.status = 500;
      return { error: "Failed to fetch companies" };
    }
  })
  .all("/api/auth/*", (ctx) => auth.handler(ctx.request))
  .listen(3000);

export type App = typeof app;
