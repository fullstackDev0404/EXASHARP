import { relations } from "drizzle-orm";
import { user } from "../auth-schema";
import { company } from "../hrms-schema/core";
import { userProfile } from "./user-profile";
import { subscription } from "./subscription";
import { exaAdminInvite } from "./exa-admin-invite";

export const userProfileRelations = relations(userProfile, ({ one }) => ({
  user: one(user, { fields: [userProfile.userId], references: [user.id] }),
}));

export const subscriptionRelations = relations(subscription, ({ one }) => ({
  company: one(company, { fields: [subscription.companyId], references: [company.id] }),
}));

export const exaAdminInviteRelations = relations(exaAdminInvite, ({ one }) => ({
  createdByUser: one(user, { fields: [exaAdminInvite.createdBy], references: [user.id] }),
  usedByUser: one(user, { fields: [exaAdminInvite.usedBy], references: [user.id] }),
}));
