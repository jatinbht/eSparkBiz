import { createConnection } from 'mysql2/promise';
import AppError from '../utils/AppError.js';

let connection;
async function initializeConnection() {
    try {
        connection = await createConnection({
            host: 'localhost',
            port: 3307,
            user: 'root',
            password: 'root',
            database: 'applicants',
            dateStrings: true // Tell MySQL driver not to convert to JS Date
        });

        console.log('Connected to MySQL');
    } catch (error) {
        // console.error('Error connecting to MySQL:', error); //TODO: centralize error handling
        throw new AppError('Failed: Connector to MySQL', 500, error);
        
    }
}

await initializeConnection();

export { connection };