import { connection } from '../config/connector.js';

async function getApplicants(applicantsPerPage, offset) {
    const statement = `select * from applicant.applicants limit ? offset ?`;
    const values = [applicantsPerPage, offset];

    const [applicants] = await connection.query(statement, values);
    return applicants;
}

async function getCount(tableReference, likeExpression) {
    let statement = `select count(*) as count from ${tableReference}`;
    let values = []

    if (likeExpression) {
        statement += ` where first_name like concat(?, '%')`;
        values.push(likeExpression)
    }
    console.debug(statement)
    console.debug(values)
    const [count] = await connection.query(statement, values);
    return count[0];
}

// async function getSearchResult(columnList, likeExpression) {
//     const statement = `select * from applicant.applicants (...${columnList}) like ? limit ? offset ?`
//     const values = [likeExpression, applicantsPerPage, offset]
// }

async function getSearchResult(likeExpression, applicantsPerPage, offset) {
    const statement = `select * from applicant.applicants where first_name like concat(?, '%') limit ? offset ?`;
    const values = [likeExpression, applicantsPerPage, offset];

    const [applicants] = await connection.query(statement, values);
    return applicants;
}

export { getApplicants, getCount, getSearchResult };
