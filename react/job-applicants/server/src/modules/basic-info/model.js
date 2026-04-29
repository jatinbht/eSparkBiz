import { connection } from "../../config/connector.js";

async function findAll(){
    const statement = `SELECT * FROM applicants.applicant`
    const [rows] = await connection.query(statement)
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