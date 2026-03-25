``` js
import mysql from 'mysql2/promise'

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'fetchapi'
})

async function getCountries() {
    const statement = `select * from fetchapi.country`

    const countries = await connection.query(statement)
    console.debug(countries)
    return countries
}

export {getCountries}```

```import mysql from 'mysql2/promise'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'fetchapi'
})

async function getCountries() {
    const statement = `select * from fetchapi.country`

    const countries = await connection.query(statement) //here, vs code linter says that await has no effect on these types of functions
    console.debug(countries)
    return countries
}

export {getCountries}```