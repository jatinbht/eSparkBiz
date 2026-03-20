import { connection } from '../helper/connector.js';

async function commitData(postPayload) {
    console.log(postPayload.courses);
    
    for (let i = 0; i < postPayload.courses.length; i++) {
        const statement =
            'insert into education (applicant_id, course, board_or_university, passing_year, percentage) values (?, ?, ?, ?, ?)';
        const values = [
            postPayload.applicantId,
            postPayload.courses[i],
            postPayload.boards_or_universities[i],
            postPayload.passing_years[i],
            postPayload.percentages[i]
        ];
    
        await connection.query(statement, values);
    }
}
async function getApplicantById(applicantId) {
    const statement = 'select * from applicants.education where applicant_id = ?';
    const value = [applicantId];

    const [applicant] = await connection.query(statement, value);
    console.log('model applicant: ', applicant);
    
    return applicant
}

async function getApplicants() {
    const statement = 'select * from applicants.applicant';

    const [applicants] = await connection.query(statement);
    return applicants;
}
export { commitData, getApplicantById, getApplicants };
