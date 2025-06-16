import { relations } from "drizzle-orm/relations";
import { users, profiles } from "./schema";

export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users, { fields: [profiles.userId], references: [users.id] }),
}));

export const usersRelations = relations(users, ({ one }) => ({
  profiles: one(profiles),
}));
