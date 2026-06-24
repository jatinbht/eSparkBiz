import { db } from '../../db/kysely.connector.js';
import { connection } from '../../db/mysql2.connector.js';
import type { DB } from '../../db/db-types.js';
import { ApplicantColumn, FindAllParams, GetCountParams } from './types.js';

db.selectFrom('applicant')
    .selectAll()
    .limit(1)
    .execute()
    .then(() => console.debug('DB connection OK'))
    .catch((err) => console.error('DB connection FAILED', err));

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

//     const statement = `SELECT * FROM applicants.applicant ORDER BY ${column} ${order} LIMIT ? OFFSET ?`
//     const values = [limit, offset]

//     const [rows] = await connection.query(statement, values)
//     return rows
// }

export async function findAll({
    limit,
    offset,
    sortOn = 'id',
    order = 'asc',
    filters,
    dob_from,
    dob_to,
}: FindAllParams) {
    console.debug(limit, offset, sortOn, order);

    let query = db.selectFrom('applicant').selectAll();

    if (filters) {
        for (const [column, value] of Object.entries(filters)) {
            if (value === undefined) continue;
            query = query.where(column as ApplicantColumn, '=', value);
        }
        if (dob_from) query = query.where('dob', '>=', dob_from);
        if (dob_to) query = query.where('dob', '<=', dob_to);
    }

    return query.orderBy(sortOn, order).limit(limit).offset(offset).execute();
}

export async function findDistinct<K extends ApplicantColumn>(
    column: K,
) {
    return db
        .selectFrom('applicant')
        .select(column)
        .distinct()
        .orderBy(column)
        .execute();
}

// // applicant.repository.ts

// export async function findPaginated({ limit, offset }) {
// const [rows, total] = await Promise.all([
//     db
//     .selectFrom("applicant")
//     .selectAll()
//     .limit(limit)
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

export async function getCount({
    filters,
    dob_from,
    dob_to
}: GetCountParams
)  {
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

export async function findById(id: number) {
    const statement = `SELECT * FROM applicants.applicant where id = ?`;
    const value = id;
    const [rows] = await connection.query(statement, value);

    return [rows];
}

export async function insert(body) {
    const statement = `insert into applicants.applicant (first_name, last_name, designation, full_address, email, phone, city, gender, zip_code, relationship_status, dob) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
        body.first_name,
        body.last_name,
        body.designation,
        body.full_address,
        body.email,
        body.phone,
        body.city,
        body.gender,
        body.zip_code,
        body.relationship_status,
        body.dob,
    ];

    const result = await connection.query(statement, values);
    return result;
}

// export {getApplicants, getApplicantById, insertApplicant }
