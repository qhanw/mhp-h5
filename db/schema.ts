import { pgTable, uuid, text, integer, timestamp, date, boolean, customType } from "drizzle-orm/pg-core"
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
	userId: uuid('user_id').unique().references(() => users.id, { onDelete: 'cascade', onUpdate:'cascade' }).notNull(),
	nickname: text(),
	gender: text(),
	avatar: text(), // 暂时不用作存储 对象OSS
	bio: text(),
	birthday: date('birthday', { mode: 'string' }),
	phoneNumber: text("phone_number"),
	country: text(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});


export const binary = customType<{ data: Buffer;  default: false; }>({  dataType() { return 'bytea' } });

export const avatars = pgTable('avatars', {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid('user_id').unique().references(() => users.id, { onDelete: 'cascade', onUpdate:'cascade' }).notNull(),
	avatar: binary(),
	description: text(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
})