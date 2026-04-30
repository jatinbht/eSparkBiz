import { connection } from "../../config/connector.js";

const allowedSortColumns = [
    "id",
    "first_name",
    "last_name",
    "created_at"
]

async function findAll({ limit, offset, column = "id", order = "DESC" }){
    if (!allowedSortColumns.includes(column)) {
        column = "id"
    }

    const statement = `SELECT * FROM applicants.applicant ORDER BY ${column} ${order} LIMIT ? OFFSET ?`
    const values = [limit, offset]


    const [rows] = await connection.query(statement, values)
    return rows
}

async function findById(id) {
    const statement = `SELECT * FROM applicants.applicant where id = ?`
    const value = id
    const [rows] = await connection.query(statement, value)

    return [rows]
}

async function insert(body) {
    const statement = `insert into applicants.applicant (first_name, last_name, designation, full_address, email, phone, city, gender, zip_code, relationship_status, dob) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    const values = [body.first_name, body.last_name, body.designation, body.full_address, body.email, body.phone, body.city, body.gender, body.zip_code, body.relationship_status, body.dob]
    
    const result = await connection.query(statement, values)
    return result
}

// export {getApplicants, getApplicantById, insertApplicant }
export { findAll, findById, insert }