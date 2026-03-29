
// ============================================
// ASSET MANAGEMENT
// ============================================

import { date, decimal, index, integer, pgTable, serial, text, timestamp, unique } from "drizzle-orm/pg-core";
import { assetStatusEnum } from "./enums";
import { employee } from "./employee";
import { company } from "./core";

export const asset = pgTable(
  "asset",
  {
    id: serial("id").primaryKey(),
    companyId: integer("company_id")
      .notNull()
      .references(() => company.id, { onDelete: "cascade" }),
    assetCode: text("asset_code").notNull(),
    name: text("name").notNull(),
    type: text("type").notNull(), // laptop, monitor, phone, etc.
    model: text("model"),
    serialNo: text("serial_no"),
    purchaseDate: date("purchase_date"),
    purchasePrice: decimal("purchase_price", { precision: 12, scale: 2 }),
    warrantyExpiry: date("warranty_expiry"),
    status: assetStatusEnum("status").default("available"),
    assignedTo: integer("assigned_to").references(() => employee.id),
    assignedAt: timestamp("assigned_at"),
    notes: text("notes"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    unique("asset_company_code").on(t.companyId, t.assetCode),
    index("asset_company_idx").on(t.companyId),
    index("asset_assigned_idx").on(t.assignedTo),
    index("asset_status_idx").on(t.status),
  ],
);
