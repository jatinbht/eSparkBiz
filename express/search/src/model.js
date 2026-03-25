import { connection } from '../config/connector.js';
import { getConditionForQueryBuilder } from './service.js';

async function getApplicants(applicantsPerPage, offset) {
    const statement = `select * from applicant.applicants limit ? offset ?`;
    const values = [applicantsPerPage, offset];

    const [applicants] = await connection.query(statement, values);
    return applicants;
}

async function getCount(tableReference, likeExpression) {
    let statement = `select count(*) as count from ${tableReference}`;
    let values = [];

    if (likeExpression) {
        statement += ` where first_name like concat(?, '%')`;
        values.push(likeExpression);
    }
    console.debug('statement: ', statement);
    console.debug('values: ', values);
    const [count] = await connection.query(statement, values);
    return count[0];
}

// async function getSearchResult(columnList, likeExpression) {
//     const statement = `select * from applicant.applicants (...${columnList}) like ? limit ? offset ?`
//     const values = [likeExpression, applicantsPerPage, offset]
// }

async function getSearchResult(paramValues, applicantsPerPage, offset) {
    let values = [];
    const columnList = ['first_name', 'last_name']; //TODO: this can be dynamically fetched from js

    let statement = `select * from applicant.applicants where`;

    for (let i = 0; i < columnList.length; i++) {
        statement += ` ${columnList[i]} like concat(?, '%')`;
        if (i < columnList.length - 1)
            statement += getConditionForQueryBuilder();
    }
    values.push(...paramValues); //todo: maybe this would require elif and not simple array index

    // when trying to build values array:
    //-----------------------------
    // paramValues.forEach(queryParam => {
    //     values.push(queryParam)
    // })
    //-----------------------------
    // const [first_name, last_name] = paramValues
    //-----------------------------

    //pagination
    statement += ` limit ? offset ?`;
    values.push(applicantsPerPage, offset);

    console.debug(statement, values);
    const [applicants] = await connection.query(statement, values);
    return applicants;
}

export { getApplicants, getCount, getSearchResult };
