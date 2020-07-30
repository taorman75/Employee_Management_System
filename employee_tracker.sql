DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE department (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
   -- to hold department name --
);

CREATE TABLE role (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL
);

CREATE TABLE employees (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL, 
    manager_id INT 
);

INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1), ("Salesperson", 80000, 1), ("Lead Engineer", 150000, 2), ("Software Engineer", 120000, 2), ("Account Manager", 160000, 3), ("Accountant", 125000, 3), ("Legal Team Lead", 250000, 4), ("Lawyer", 190000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Jane", "Doe", 1, NULL), ("Billy", "Goat", 2, 1), ("Alice", "Kravitz", 3, NULL), ("Kevin", "Pickles", 4, 3), ("Jake", "Peralta", 5, NULL), ("Rosa", "Diaz", 6, 5), ("Raymond", "Holt", 7, NULL), ("Cheddar", "Holt", 8, 7);

SELECT * FROM employees;
