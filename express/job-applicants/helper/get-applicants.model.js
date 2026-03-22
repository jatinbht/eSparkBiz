import { connection } from "./connector.js";

export async function getApplicants() {
    const statement = 'select * from applicants.applicant';

    const [applicants] = await connection.query(statement);
    return applicants;
}