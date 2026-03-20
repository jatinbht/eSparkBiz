import { connection } from '../helper/connector.js';
const technologiesList = ['js', 'java', 'php', 'sql']

function getTechnologiesList() {
    return technologiesList
}

function getTechnologiesDetails(applicantId){
    const statement = 'select * from applicants.technologies where id = ?'
    const value = applicantId

    const [result] = connection.query(statement, value)
    console.log(result);
    
    return result
}

export {getTechnologiesDetails, getTechnologiesList}