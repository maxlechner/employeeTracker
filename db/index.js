const connection = require("./connection");

module.exports = {
    viewDepartments() {
        return connection.query( "SELECT * FROM department");
    }

    viewRoles() {
        return connection.query( "SELECT * FROM emp_role");
    }

    viewEmployees() {
        return connection.query( "SELECT * FROM employee");
    }
}