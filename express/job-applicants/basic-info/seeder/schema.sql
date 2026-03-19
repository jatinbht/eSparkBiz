CREATE DATABASE IF NOT EXISTS applicants;
USE applicants;

CREATE TABLE applicants.applicant(
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    designation VARCHAR(30) NOT NULL DEFAULT 'Intern',
    full_address VARCHAR(255),
    email VARCHAR(50) NOT NULL UNIQUE,
    phone VARCHAR(10) NOT NULL UNIQUE,
    city VARCHAR(30),
    state VARCHAR(30) DEFAULT 'Gujarat',
    gender ENUM('male', 'female', 'other') NOT NULL,
    zip_code char(6),
    relationship_status  ENUM('single', 'committed'),
    dob DATE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);