import { connection } from "../../config/connector.js";

async function getApplicants(){
    const statement = `SELECT * FROM applicants.applicant`
    const [rows] = await connection.query(statement)
    return rows
}

async function getApplicantById(id) {
    const statement = `SELECT * FROM applicants.applicant where id = ?`
    const value = id
    const [rows] = await connection.query(statement, value)

    return rows
}

async function createApplicant(postPayload) {
    const statement = 'insert into applicants.applicant (first_name, last_name, designation, full_address, email, phone, city, gender, zip_code, relationship_status, dob) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    const values = [postPayload['first-name'], postPayload['last-name'], postPayload.designation, postPayload.full_address, postPayload.email, postPayload.phone, postPayload.city, postPayload.gender, postPayload.zip_code, postPayload.relationship_status, postPayload.dob]
    
    const result = connection.query(statement, values)
    return result
}

export {getApplicants, getApplicantById, createApplicant}