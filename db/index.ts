import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
// import { eq } from "drizzle-orm";
// import { users as usersTable } from "./schema";

import * as schema from "./schema";
import * as relations from "./relations";
export * from "./schema";

export const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL,
    // ssl: true // 暂时不开启 否则数据库连接不上
  },
  schema: { ...schema, ...relations },
});

// node-postgres with config

// import 'dotenv/config';
// import { drizzle } from 'drizzle-orm/node-postgres';
// // You can specify any property from the node-postgres connection options
// const db = drizzle({
//   connection: {
//     connectionString: process.env.DATABASE_URL!,
//     ssl: true
//   }
// });

// node-postgres driver

// import 'dotenv/config';
// import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
// import { drizzle } from "drizzle-orm/node-postgres";
// import { Pool } from "pg";

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL!,
// });
// const db = drizzle({ client: pool });

// Test code

// async function main() {
//   const user: typeof usersTable.$inferInsert = {
//     username: "John",
//     password: "30",
//     email: "john@example.com",
//   };
//   await db.insert(usersTable).values(user);
//   console.log("New user created!");
//   const users = await db.select().from(usersTable);
//   console.log("Getting all users from the database: ", users);
//   /*
//   const users: {
//     id: number;
//     name: string;
//     age: number;
//     email: string;
//   }[]
//   */
//   await db
//     .update(usersTable)
//     .set({
//       password: "31",
//     })
//     .where(eq(usersTable.email, user.email!));
//   console.log("User info updated!");
//   //   await db.delete(usersTable).where(eq(usersTable.email, user.email!));
//   //   console.log("User deleted!");
// }
// main();
