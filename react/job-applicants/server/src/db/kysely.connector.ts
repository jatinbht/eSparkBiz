// db.ts
import { Kysely, MysqlDialect } from "kysely";
import type { DB } from "../db/db-types.ts";
import { createPool } from "mysql2";

export const db = new Kysely<DB>({
  dialect: new MysqlDialect({
    pool: createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
    }),
  }),
});


// console.debug('DB_PASSWORD:', process.env.DB_PASSWORD);
// console.debug('DB_PORT:', process.env.DB_PORT, typeof process.env.DB_PORT);


// import mysql from "mysql2/promise";
// const testConn = await mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "applicants",
//   port: 3307,
// });
// console.debug("direct connection OK");
// await testConn.end();