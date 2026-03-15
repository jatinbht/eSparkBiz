CREATE DATABASE IF NOT EXISTS applicants;
USE applicants;

CREATE TABLE applicant(
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    designation VARCHAR(30) NOT NULL,
    full_address VARCHAR(255),
    email VARCHAR(20) NOT NULL UNIQUE,
    phone VARCHAR(10) NOT NULL UNIQUE,
    city VARCHAR(30),
    state VARCHAR(30),
    gender ENUM('male', 'female') NOT NULL,
    zip_code char(6),
    relationship_status  ENUM('single', 'committed'),
    dob DATE NOT NULL
);