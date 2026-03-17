import { app } from '../../app.js';
import { connection } from '../../helper/connector.js';

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
    const statement = 'select * from applicants.applicant where id = ? and is_deleted = false';
    const value = applicantId

    let [rows] = await connection.query(statement, value);

    // console.log("Rows: ", rows); //debug

    return rows;
}

async function getStates() {
    const statement = 'select distinct state from applicants.applicant where state is not null'

    let [rows] = await connection.query(statement)
    return rows;
}

async function setIsDeleted(applicantId) {
    // const statement = 'update applicants.applicant set is_deleted = 1 where id = ?'
    // const value = applicantId

    // connection.query(statement, value)
}

async function updateApplicant(postBody) {
    console.log(postBody);
    
    const statement = 'update applicants.applicant set first_name = ?, last_name = ? where id = ?'
    const values = [postBody['first_name'], postBody.last_name, postBody.id]

    let [rows] = await connection.query(statement, values)
    return rows;
}
export { getList, getApplicantCount, getDetails, getStates, setIsDeleted, updateApplicant };
