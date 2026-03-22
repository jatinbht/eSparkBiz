import { connection } from '../helper/connector.js';
import { technologiesList } from './service.js';


async function getTechnologiesDetails(applicantId){
    const statement = 'select * from applicants.technologies where applicant_id = ?'
    const value = applicantId

    const [rows] = await connection.query(statement, value)
    console.debug('result: ', rows);
    
    return rows
}

async function saveTechnologiesForApplicant(postPayload) {
    let result;

    for (const tech of technologiesList) {
        if (postPayload[tech]) {
            const statement = `INSERT INTO applicants.technologies (applicant_id, label, proficiency) VALUES (?, ?, ?)`;
            const values = [postPayload.applicantId, tech, postPayload[tech]];

            const [queryResult] = await connection.query(statement, values);
            result = queryResult;
        }
    }
    return result?.insertId;
}

export {getTechnologiesDetails, saveTechnologiesForApplicant}