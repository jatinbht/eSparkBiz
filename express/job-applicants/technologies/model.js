import { connection } from '../helper/connector.js';
import { technologiesList } from './service.js';


async function getTechnologiesDetails(applicantId){
    const statement = `select * from applicants.technologies where applicant_id = ? and is_deleted = false`
    const value = [applicantId]

    const [rows] = await connection.query(statement, value)
    console.debug('result: ', rows);
    
    return rows
}

async function saveTechnologiesForApplicant(postPayload) {
    let result;
    console.debug('postPayload: ', postPayload)

    for (const technology of technologiesList) {
        if (postPayload[technology]) {
            const statement = `INSERT INTO applicants.technologies (applicant_id, label, proficiency) VALUES (?, ?, ?)`;
            const values = [postPayload.applicantId, technology, postPayload[technology]];

            const [queryResult] = await connection.query(statement, values);
            result = queryResult;
        }
    }
    return result?.insertId;
}
async function updateTechnologiesForApplicant(postPayload) {
    let result;

    let i = 0;
    for (const technology of technologiesList) {
        i++;
        if (postPayload[technology]) {
            console.debug(`updateTechnologiesForApplicant model running ${i}`)
            const statement = `update applicants.technologies set proficiency = ? where applicant_id = ? and label = ?`
            const values = [postPayload[technology], postPayload.applicantId, technology];

            const [queryResult] = await connection.query(statement, values);
            result = queryResult;
        }
    }
    return result
}

async function upsertTechnologiesForApplicant(postPayload) {
    for (const technology of technologiesList ){
        if (postPayload[technology]) {
            const statement = `insert into applicants.technologies (applicant_id, label, proficiency) values (?, ?, ?) ON duplicate key update proficiency = values(proficiency)`
            const values = [postPayload.applicant_id, technology, postPayload[technology]]

            await connection.query(statement, values)
        }
    }
}

export {getTechnologiesDetails, saveTechnologiesForApplicant, updateTechnologiesForApplicant, upsertTechnologiesForApplicant}