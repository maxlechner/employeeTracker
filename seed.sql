DROP DATABASE IF EXISTS employeeTracker_DB;

CREATE DATABASE employeeTracker_DB;

USE employeeTracker_DB;

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  dept_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  dept_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO department
  (dept_name)
VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal');

INSERT INTO role
  (title, salary, dept_id)
VALUES
  ('Sales Lead', 100000, 1),
  ('Salesperson', 80000, 1),
  ('Lead Engineer', 150000, 2),
  ('Software Engineer', 120000, 2),
  ('Account Manager', 160000, 3),
  ('Accountant', 125000, 3),
  ('Legal Team Lead', 250000, 4),
  ('Lawyer', 190000, 4);

INSERT INTO employee
  (first_name, last_name, role_id, manager_id)
VALUES
  ('John', 'Doe', 1, 3),
  ('Mike', 'Chan', 2, 1),
  ('Jim', 'Dole', 5, 4),
  ('Jason', 'Dome', 3, 6),
  ('Jimmy', 'Dale', 4, 3),
  ('Jessica', 'Doer', 6, 5),
  ('Jennifer', 'Dell', 8, 7);
