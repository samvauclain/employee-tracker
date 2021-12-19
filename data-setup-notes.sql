

mysql -u root -p

-- CREATE DATABASE election;

-- USE election;

-- CREATE TABLE candidates (
--   id INTEGER AUTO_INCREMENT PRIMARY KEY,
--   first_name VARCHAR(30) NOT NULL,
--   last_name VARCHAR(30) NOT NULL,
--   industry_connected BOOLEAN NOT NULL
-- );

-- DESCRIBE candidates;

CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE departments (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INTEGER NOT NULL
);

CREATE TABLE employee (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER NOT NULL
);


DESCRIBE departments;
DESCRIBE role;
