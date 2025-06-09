import { pgTable, uuid,  uniqueIndex, bigserial, text, integer, timestamp, bigint, unique, varchar } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { number } from "zod";

export const users = pgTable("users", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	// id: uuid().defaultRandom().primaryKey().notNull(),
    id: bigserial({mode:'number'}).primaryKey(),
	username: text().notNull(),
	email: text().unique().notNull(),
	password: text().notNull(),
	age: integer(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

