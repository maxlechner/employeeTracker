const connection = require("./connection");
var mysql = require("mysql");

module.exports = {
    getDepartments() {
        return connection.query( "SELECT * FROM department");
    },

    getRoles() {
        return connection.query( "SELECT * FROM role");
    },

    getEmployees() {
        return connection.query( "SELECT * FROM employee");
    },

    getDepts_Roles() {
        // return connection.query( "SELECT * FROM employee");
        return connection.query(
            "SELECT role.title, role.id, role.dept_id, department.id, department.dept_name FROM department INNER JOIN role ON role.dept_id=department.id");
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
        return connection.query("UPDATE role SET ? WHERE ?")
    }

}