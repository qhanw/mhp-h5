import { pgTable, uuid, text, integer, timestamp, date, boolean, foreignKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	username: text().unique().notNull(),
	email: text().unique().notNull(),
	password: text().notNull(),
	isActive: boolean('is_active'),
	isVerified: boolean('is_verified'),
	lastLogin: timestamp("last_login", { withTimezone: true, mode: 'string' }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const profiles = pgTable("profiles", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
	nickname: text(),
	sex: text(),
	age: integer(),
	avatar: text(),
	bio: text(),
	birthday: date(),
	phoneNumber: text("phone_number"),
	country: text(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});