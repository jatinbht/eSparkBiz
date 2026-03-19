import { connection } from '../helper/connector.js';

async function getList(limit, offset) {
    const statement = 'select * from applicants.applicant limit ? offset ?';
    const values = [limit, offset];

    let [rows] = await connection.query(statement, values);

    // console.log("Rows: ", rows); //debug

    return rows;
}

async function getApplicantCount() {
    const statement = 'select count(*) as count from applicants.applicant';
    let [rows] = await connection.query(statement);

    return rows[0].count;
}

async function getDetails(applicantId) {
    const statement = 'select * from applicants.applicant where `id` = ? and `is_deleted` = false';
    const value = [applicantId]
    // console.log('applicantid: ', applicantId);
    

    let [rows] = await connection.query(statement, value);

    // console.log("Rows: ", rows); //debug
        return rows[0];
}

async function getStates() {
    const statement = 'select distinct state from applicants.applicant where state is not null'

    let [rows] = await connection.query(statement)
    return rows;
}

async function setIsDeleted(id) {
    // const statement = 'update applicants.applicant set is_deleted = 1 where id = ?'
    // const value = applicantId

    // connection.query(statement, value)
}

async function updateApplicant(postBody) {    
    const statement = 'update applicants.applicant set first_name = ?, last_name = ?, designation=?, full_address=?, email=?, phone=?, city=?, gender=?, zip_code=?, relationship_status=?, dob=? where id = ?'
    const values = [postBody['first-name'], postBody['last-name'], postBody.designation, postBody.full_address, postBody.email, postBody.phone, postBody.city, postBody.gender, postBody.zip_code, postBody.relationship_status, postBody.dob, postBody.id]

    let [applicant] = await connection.query(statement, values)
    return applicant;
}

async function getApplicantById(id) {
    const statement = 'select * from applicants.applicant where id = ?'
    const value = [id]

    let [result] = await connection.query(statement, value)
    return result.affectedRows === 1;
}

async function createApplicant(postBody) {
    const statement = 'insert into applicants.applicant (first_name, last_name, designation, full_address, email, phone, city, gender, zip_code, relationship_status, dob) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    const values = [postBody['first-name'], postBody['last-name'], postBody.designation, postBody.full_address, postBody.email, postBody.phone, postBody.city, postBody.gender, postBody.zip_code, postBody.relationship_status, postBody.dob]

    let [result] = await connection.query(statement, values)
    return result;
}
export { getList, getApplicantCount, getDetails, getStates, setIsDeleted, updateApplicant, getApplicantById, createApplicant };
