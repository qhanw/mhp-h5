import { relations } from "drizzle-orm/relations";
import { users, profiles, avatars } from "./schema";

export const usersRelations = relations(users, ({ one }) => ({
  profile: one(profiles, { fields: [users.id], references: [profiles.userId] }),
  avatar: one(avatars, { fields: [users.id], references: [avatars.userId] }),
}));

export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users, { fields: [profiles.userId], references: [users.id] }),
}));

export const avatarsRelations = relations(avatars, ({ one }) => ({
  user: one(users, { fields: [avatars.userId], references: [users.id] }),
}));
