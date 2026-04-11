import { connection } from "../src/config/connector";

await connection.query(`
    CREATE DATABASE IF NOT EXISTS applicants;
    
    CREATE TABLE IF NOT EXISTS applicants.applicant(
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(20) NOT NULL,
        last_name VARCHAR(20) NOT NULL,
        designation VARCHAR(30) NOT NULL DEFAULT 'Intern',
        full_address VARCHAR(255),
        email VARCHAR(50) NOT NULL UNIQUE,
        phone VARCHAR(20) NOT NULL UNIQUE,
        city VARCHAR(30),
        state VARCHAR(30) DEFAULT 'Gujarat',
        gender ENUM('male', 'female', 'other') NOT NULL,
        zip_code char(6),
        relationship_status  ENUM('single', 'committed'),
        dob DATE NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        is_deleted BOOLEAN DEFAULT FALSE
    )
`)

await connection.end()

console.log('Schema created')