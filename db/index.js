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

    insertRole(data) {
        return connection.query("INSERT INTO role SET ?", data)
    },
    
    insertDepartment(data) {
        return connection.query("INSERT INTO department SET ?", data)
    }


}