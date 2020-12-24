DROP DATABASE IF EXISTS employeeTracker_DB;
​
CREATE DATABASE employeeTracker_DB;
​
USE employeeTracker_DB;
​
CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  dept_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE emp_role(
  id INT NOT NULL AUTO_INCREMENT,
  emp_role VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL;
  dept_id: INT NOT NULL;
  PRIMARY KEY (id)
);

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL;
  manager_id INT NOT NULL;
  PRIMARY KEY (id)
);