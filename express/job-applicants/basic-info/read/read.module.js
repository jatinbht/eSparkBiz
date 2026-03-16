import { connection } from '../../helper/connector.js';

async function getPageData(limit, offset) {
    const pageDataStatement = 'select * from applicants.applicant limit ? offset ?';
    const values = [Number(limit), Number(offset)];

    let [rows] = await connection.query(pageDataStatement, values);

    console.log("Rows: ", rows); //debug

    return rows;
}

async function getApplicantCount() {
    const applicantCountStatement = 'select count(*) as count from applicants.applicant';
    let [rows] = await connection.query(applicantCountStatement);

    return rows[0].count;
}



export { getPageData, getApplicantCount };
