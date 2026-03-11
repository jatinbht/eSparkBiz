DROP DATABASE IF EXISTS std_page;
CREATE DATABASE std_page;

USE std_page;

CREATE TABLE students(
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(15) UNIQUE,
    date_of_birth DATE NOT NULL,
    permanent_address VARCHAR(255) NOT NULL,
    city VARCHAR(50) NOT NULL,
    gender ENUM('MALE', 'FEMALE', 'OTHER') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_first_name ON students(first_name);
-- CREATE INDEX idx_email ON students(email);
-- CREATE INDEX idx_date_of_birth ON students(date_of_birth);
-- CREATE INDEX idx_created_at ON students(created_at);

-- select count(*) from students;
-- select * from students limit 100;

-- INSERT INTO students (first_name, last_name, email, phone_number, date_of_birth, permanent_address, city, gender, created_at, updated_at) VALUES ('John', 'Doe', 'john.doe@example.com', '123-456-7890', '2000-05-15', '123 Main St, Springfield, IL', 'Springfield', 'MALE', NOW(), DATE_ADD(NOW(), INTERVAL 5 HOUR));

-- SELECT * FROM students WHERE MONTH(date_of_birth) = MONTH(CURRENT_DATE)AND DAY(date_of_birth) = DAY(CURRENT_DATE);