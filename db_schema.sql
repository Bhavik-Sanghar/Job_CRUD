-- Active: 1771937870829@@127.0.0.1@3306@job_portal
-- Active: 1771937870829@@127.0.0.1@3306@job_portal-- Active: 1770624771749@@127.0.0.1@3306@job_portal


CREATE DATABASE IF NOT EXISTS job_portal;
USE job_portal;
drop applicants;
CREATE TABLE applicants (
    applicant_id INT AUTO_INCREMENT PRIMARY KEY,
    
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    designation VARCHAR(100),

    address1 TEXT,
    address2 TEXT,

    email VARCHAR(100),
    phone VARCHAR(20),

    city VARCHAR(50),
    state VARCHAR(50),
    zip_code VARCHAR(10),

    gender VARCHAR(10),
    relationship_status VARCHAR(20),

    dob DATE,

    notice_period INT,
    department VARCHAR(20),

    current_ctc INT,
    expected_ctc INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE education (

    edu_id INT AUTO_INCREMENT PRIMARY KEY,

    applicant_id INT,

    course VARCHAR(100),
    passing_year INT,
    university VARCHAR(100),
    result VARCHAR(20),

    FOREIGN KEY (applicant_id) REFERENCES applicants(applicant_id)
);

CREATE TABLE work_experience (
    work_id INT AUTO_INCREMENT PRIMARY KEY,

    applicant_id INT,

    company VARCHAR(100),
    designation VARCHAR(100),
    from_date DATE,
    to_date DATE,

    package INT,
    reason TEXT,

    ref_contact VARCHAR(20),
    ref_name VARCHAR(100),

    FOREIGN KEY (applicant_id) REFERENCES applicants(applicant_id)
);

CREATE TABLE languages (
    lang_id INT AUTO_INCREMENT PRIMARY KEY,

    applicant_id INT,

    language_name VARCHAR(20),

    can_read BOOLEAN,
    can_write BOOLEAN,
    can_speak BOOLEAN,

    FOREIGN KEY (applicant_id) REFERENCES applicants(applicant_id)
);

CREATE TABLE technologies (
    tech_id INT AUTO_INCREMENT PRIMARY KEY,

    applicant_id INT,

    technology VARCHAR(50),
    level VARCHAR(20),

    FOREIGN KEY (applicant_id) REFERENCES applicants(applicant_id)
);

CREATE TABLE references_contact (
    ref_id INT AUTO_INCREMENT PRIMARY KEY,

    applicant_id INT,

    name VARCHAR(100),
    contact VARCHAR(20),
    relation VARCHAR(50),

    FOREIGN KEY (applicant_id) REFERENCES applicants(applicant_id)
);

CREATE TABLE preferred_locations (
    pref_id INT AUTO_INCREMENT PRIMARY KEY,

    applicant_id INT,

    location VARCHAR(50),

    FOREIGN KEY (applicant_id) REFERENCES applicants(applicant_id)
);