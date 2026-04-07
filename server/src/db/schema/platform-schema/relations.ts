import { relations } from "drizzle-orm";
import { user } from "../auth-schema";
import { company } from "./company";
import { userProfile } from "./user-profile";
import { subscription } from "./subscription";
import { exaAdminInvite } from "./exa-admin-invite";

export const companyRelations = relations(company, ({ one, many }) => ({
  requestedByUser: one(user, { fields: [company.requestedBy], references: [user.id] }),
  approvedByUser: one(user, { fields: [company.approvedBy], references: [user.id] }),
  userProfiles: many(userProfile),
  subscriptions: many(subscription),
}));

export const userProfileRelations = relations(userProfile, ({ one }) => ({
  user: one(user, { fields: [userProfile.userId], references: [user.id] }),
  company: one(company, { fields: [userProfile.companyId], references: [company.id] }),
}));

export const subscriptionRelations = relations(subscription, ({ one }) => ({
  company: one(company, { fields: [subscription.companyId], references: [company.id] }),
}));

export const exaAdminInviteRelations = relations(exaAdminInvite, ({ one }) => ({
  createdByUser: one(user, { fields: [exaAdminInvite.createdBy], references: [user.id] }),
  usedByUser: one(user, { fields: [exaAdminInvite.usedBy], references: [user.id] }),
}));
