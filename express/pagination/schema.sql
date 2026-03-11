create database if not exists applicant;

create table applicant.applicants (
    id bigint unsigned primary key auto_increment,
    first_name varchar(20) not null,
    last_name varchar(20) not null,
    phone varchar(10) not null unique,
    email varchar(100) not null unique,
    full_address varchar(255),
    dob date not null,
    gender enum('male', 'female', 'other') not null,
    city varchar(50)
);

create index idx_first_name on applicants(first_name);