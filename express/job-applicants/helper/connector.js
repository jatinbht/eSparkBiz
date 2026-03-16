import { createConnection } from 'mysql2/promise';

let connection;
async function initializeConnection(params) {
    try {
        connection = await createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'applicants',
        });

        console.log('Connected to MySQL');
    } catch (error) {
        console.error('Error connecting to MySQL:', error);
    }
}

await initializeConnection();

export { connection };
