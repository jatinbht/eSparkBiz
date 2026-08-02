// Typical methods include:
// findById()
// findByIdOrThrow()
// findAll()
// insert()
// update()
// delete()
// exists()
// count()

import { db } from '../../db/kysely.connector.js';
// import { connection } from '../../../db/mysql2.connector.js';
import type {
    FindAllParams,
    GetCountParams,
} from './types.js';
import { toApplicantInsert } from './mapper.js';
// import AppError from '../../errors/AppError.js';
import AppError from '@job-applicants/server-core/errors/AppError'; // adjust path
import { ErrorCode, type CreateBasicInfo } from '@job-applicants/schemas';
import type { ApplicantColumn } from "@job-applicants/shared";


// db.selectFrom('applicant')
//     .selectAll()
//     .limit(1)
//     .execute()
//     .then(() => console.debug('DB connection OK'))
//     .catch((err) => console.error('DB connection FAILED', err));

//NOTE: MYSQL2 VERSION
// const allowedSortColumns = [
//     "id",
//     "first_name",
//     "last_name",
//     "created_at"
// ]

// async function findAll({ limit, offset, column = "id", order = "DESC" }){
//     if (!allowedSortColumns.includes(column)) {
//         column = "id"
//     }

//     const statement = `SELECT * FROM applicants.applicant ORDER BY ${column} ${order} pageSize ? OFFSET ?`
//     const values = [pageSize, offset]

//     const [rows] = await connection.query(statement, values)
//     return rows
// }

export async function findAll({
    pageSize,
    offset,
    sortOn = 'id',
    order = 'asc',
    filters,
    dob_from,
    dob_to,
}: FindAllParams) {
    console.debug(pageSize, offset, sortOn, order);

    let query = db.selectFrom('applicant').selectAll();

    if (filters) {
        for (const [column, value] of Object.entries(filters)) {
            if (value === undefined) continue;
            query = query.where(column as ApplicantColumn, '=', value); //this prevents injection using Kyesely types
        }
        if (dob_from) query = query.where('dob', '>=', dob_from);
        if (dob_to) query = query.where('dob', '<=', dob_to);
    }

    // console.log("before execute");
    const result = await query
        .orderBy(sortOn, order)
        .limit(pageSize)
        .offset(offset)
        .execute();
    // console.log("after execute", result);

    return result;

    // const query = db
    // .selectFrom("applicant")
    // .selectAll()
    // .orderBy(sortOn, order)
    // .limit(pageSize)
    // .offset(offset);


    // console.log("before execute");

    // const promise = query.execute();
    
    // console.log("execute returned", promise);
    
    // const result = await promise;
    
    // console.log("after execute");

    // console.log(result);


    // return result;
}

export async function findDistinct<K extends ApplicantColumn>(column: K) {
    return db
        .selectFrom('applicant')
        .select(column)
        .distinct()
        .orderBy(column)
        .execute();
}

// // applicant.repository.ts

// export async function findPaginated({ pageSize, offset }) {
// const [rows, total] = await Promise.all([
//     db
//     .selectFrom("applicant")
//     .selectAll()
//     .limit(pageSize)
//     .offset(offset)
//     .execute(),

//     db
//     .selectFrom("applicant")
//     .select((eb) => eb.fn.countAll().as("count"))
//     .executeTakeFirst(),
// ])

// return {
//     rows,
//     total: Number(total.count),
// }
// }

export async function getCount({ filters, dob_from, dob_to }: GetCountParams) {
    let query = db
        .selectFrom('applicant')
        .select((eb) => eb.fn.countAll().as('count'));

    if (filters) {
        for (const [column, value] of Object.entries(filters)) {
            if (value === undefined) continue;
            query = query.where(column as ApplicantColumn, '=', value);
        }
    }
    if (dob_from) query = query.where('dob', '>=', dob_from);
    if (dob_to) query = query.where('dob', '<=', dob_to);

    return query.executeTakeFirstOrThrow();
}

// export async function findById(id: number) {
//     const statement = `SELECT * FROM applicants.applicant where id = ?`;
//     console.log('id', id);

//     const value = id;
//     const [rows] = await connection.query(statement, value);

//     return [rows];
// }

export async function findById(id: number) {
    return db
        .selectFrom('applicant')
        .selectAll()
        .where('id', '=', id)
        .executeTakeFirst();
}

export async function findByIdOrThrow(id: number) {
    const applicant = await findById(id);

    if (!applicant) {
        throw new AppError({
            code: ErrorCode.NOT_FOUND,
            message: `Applicant ${id} not found.`,
        });
    }

    return applicant;
}

// export async function insert(body) {
//     const statement = `insert into applicants.applicant (first_name, last_name, designation, full_address, email, phone, city, gender, zip_code, relationship_status, dob) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
//     const values = [
//         body.first_name,
//         body.last_name,
//         body.designation,
//         body.full_address,
//         body.email,
//         body.phone,
//         body.city,
//         body.gender,
//         body.zip_code,
//         body.relationship_status,
//         body.dob,
//     ];

//     const result = await connection.query(statement, values);
//     return result;
// }
// type Dob = CreateBasicInfo['dob'];

export async function insert(body: CreateBasicInfo) {
    const result = await db
        .insertInto('applicant')
        .values(toApplicantInsert(body))
        .executeTakeFirst();

    if (result.insertId === undefined) {
        throw new AppError({
            code: ErrorCode.INTERNAL_SERVER_ERROR,
            message: 'Insert failed: no insertId returned.',
        });
    }

    return Number(result.insertId);
}

// import { createPool } from "mysql2/promise";

// const pool = createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     port: Number(process.env.DB_PORT),
// });
// console.log(pool);
// console.log("before");

// const conn = await pool.getConnection();

// console.log("after");

// conn.release();
// console.log(pool.Promise === Promise);
// console.log(pool.Promise);
// console.log(globalThis.Promise);



// console.log(import.meta.url);
// console.log(createPool.toString());

// import { createRequire } from "module";

// const require = createRequire(import.meta.url);

// console.log(require.resolve("mysql2/promise"));
// console.log(require.resolve("mysql2"));



// const [rows] = await pool.query(
//     "SELECT * FROM applicant LIMIT 1"
// );

// console.log(rows);