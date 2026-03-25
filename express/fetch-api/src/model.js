import mysql from 'mysql2/promise'

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'fetchapi'
})

async function getCountries() {
    const statement = `select * from fetchapi.country`

    const [countries] = await connection.query(statement)
    console.debug(countries)
    return countries
}

async function getStates(country) {
    const statement = `select * from fetchapi.states where country_id = ?`
    const value = [country]

    const [states] = await connection.query(statement, value)
    console.debug('states ', states)
    return states
}

export {getCountries, getStates}