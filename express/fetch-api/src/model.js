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

async function getStates(countryId) {
    const statement = `select * from fetchapi.state where country_id = ?`
    const value = [countryId]

    const [states] = await connection.query(statement, value)
    console.debug('states ', states)
    return states
}

async function getCities(stateId) {
    const statement = `select * from fetchapi.city where state_id = ?`
    const value = [stateId]

    const [cities] = await connection.query(statement, value)
    return cities
}

export {getCountries, getStates, getCities}