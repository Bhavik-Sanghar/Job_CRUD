-- Active: 1771937870829@@127.0.0.1@3306@job_application

CREATE DATABASE IF NOT EXISTS job_application;
USE job_application;

DROP TABLE IF EXISTS option_master;
DROP TABLE IF EXISTS select_master;
DROP TABLE IF EXISTS preferred_locations;
DROP TABLE IF EXISTS references_contact;
DROP TABLE IF EXISTS technologies;
DROP TABLE IF EXISTS languages;
DROP TABLE IF EXISTS work_experience;
DROP TABLE IF EXISTS education;
DROP TABLE IF EXISTS applicants;

CREATE TABLE select_master (
    select_id INT AUTO_INCREMENT PRIMARY KEY,
    select_key VARCHAR(50) UNIQUE NOT NULL,
    label VARCHAR(100) NOT NULL,
    control_type VARCHAR(20) NOT NULL,
    is_multi BOOLEAN DEFAULT 0,
    sort_order INT DEFAULT 0
);

CREATE TABLE option_master (
    option_id INT AUTO_INCREMENT PRIMARY KEY,
    select_key VARCHAR(50) NOT NULL,
    value VARCHAR(100) NOT NULL,
    label VARCHAR(100) NOT NULL,
    sort_order INT DEFAULT 0,
    FOREIGN KEY (select_key) REFERENCES select_master(select_key)
);

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

INSERT INTO select_master (select_key, label, control_type, is_multi, sort_order) VALUES
('gender', 'Gender', 'radio', 0, 1),
('state', 'State', 'select', 0, 2),
('relationship_status', 'Relationship Status', 'select', 0, 3),
('preferred_location', 'Preferred Location', 'select', 1, 4),
('department', 'Department', 'select', 0, 5),
('languages', 'Languages', 'grid', 1, 6),
('language_abilities', 'Language Abilities', 'checkbox', 1, 7),
('skills', 'Skills', 'grid', 1, 8),
('skill_levels', 'Skill Levels', 'radio', 0, 9);

INSERT INTO option_master (select_key, value, label, sort_order) VALUES
('gender', 'male', 'Male', 1),
('gender', 'female', 'Female', 2),
('state', 'gujarat', 'Gujarat', 1),
('state', 'goa', 'Goa', 2),
('state', 'xyz', 'Xyz', 3),
('relationship_status', 'single', 'Single', 1),
('relationship_status', 'married', 'Married', 2),
('relationship_status', 'divorced', 'Divorced', 3),
('preferred_location', 'ahm', 'Ahmedabad', 1),
('preferred_location', 'gandhinagar', 'Gandhinagar', 2),
('preferred_location', 'rajkot', 'Rajkot', 3),
('preferred_location', 'surat', 'Surat', 4),
('department', 'dev', 'Development', 1),
('department', 'qa', 'QA', 2),
('department', 'ba', 'BA', 3),
('department', 'dba', 'DBA', 4),
('languages', 'hindi', 'Hindi', 1),
('languages', 'english', 'English', 2),
('languages', 'gujarati', 'Gujarati', 3),
('language_abilities', 'read', 'Read', 1),
('language_abilities', 'write', 'Write', 2),
('language_abilities', 'speak', 'Speak', 3),
('skills', 'php', 'PHP', 1),
('skills', 'java', 'JAVA', 2),
('skills', 'sql', 'SQL', 3),
('skills', 'node', 'Node', 4),
('skill_levels', 'Beginner', 'Beginner', 1),
('skill_levels', 'Intermediate', 'Intermediate', 2),
('skill_levels', 'Expert', 'Expert', 3);