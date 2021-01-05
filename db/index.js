const connection = require("./connection");
var mysql = require("mysql");

module.exports = {
    getDepartments() {
        return connection.query( "SELECT * FROM department");
    },

    getRoles() {
        return connection.query( "SELECT * FROM role" );
    },

    getEmployees() {
        return connection.query( "SELECT * FROM employee");
    },

    getDepts_Roles() {
        return connection.query(
            "SELECT role.title, role.id, role.dept_id, department.id, department.dept_name FROM department INNER JOIN role ON role.dept_id=department.id");
    },

    getEmployees_Roles() {
        return connection.query(
            "SELECT role.id, role.title, employee.role_id, employee.id, employee.first_name, employee.last_name, employee.manager_id, employee.first_name, employee.last_name FROM employee INNER JOIN role ON role.id=employee.role_id");
    },

    insertRole(data) {
        return connection.query("INSERT INTO role SET ?", data)
    },

    insertDepartment(data) {
        return connection.query("INSERT INTO department SET ?", data)
    },

    insertEmployee(data) {
        return connection.query("INSERT INTO employee SET ?", data)
    }, 

    updateRole(data) {
        return connection.query("UPDATE employee SET ? WHERE ?", data)
    },

    updateManager(data) {
        return connection.query("UPDATE employee SET ? WHERE ?", data)
    },

    managerGroup(data) {
        return connection.query("SELECT * FROM employee WHERE ?", data)
    },

    removeDepartment(data) {
        return connection.query("DELETE FROM department WHERE ?", data)
    },

    removeRole(data) {
        return connection.query("DELETE FROM role WHERE ?", data)
    },

    getBudget(data) {
        return connection.query("SELECT role.dept_id, role.id AS roleID, role.salary,employee.role_id, SUM(role.salary) FROM employee JOIN role ON role.id = employee.role_id JOIN department ON department.id = role.dept_id WHERE ? GROUP BY role.dept_id", data)
    }
    

}