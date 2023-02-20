DROP DATABASE IF EXISTS avenger_db;
CREATE DATABASE avenger_db;

USE avenger_db;

-- department table
CREATE TABLE Departments (
    id INT NOT NULL AUTO_INCREMENT,
    Department VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

-- role table
CREATE TABLE Roles (
    id INT NOT NULL AUTO_INCREMENT,
    Title VARCHAR(30) NOT NULL,
    Salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) 
    REFERENCES Departments(id)
);

-- employee table
CREATE TABLE Employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) 
    REFERENCES Roles(id),
    FOREIGN KEY (manager_id) 
    REFERENCES Employees(id)
);

source db/seeds.sql; -- insert departments, roles, employees
