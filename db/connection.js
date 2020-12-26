const mysql = require("mysql");
const util = require("util");

// 2. Create the MySQL `connection` object.
var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "!!MYSQLfukk69",
    database: "employeeTracker_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    // console.log('connected as id ' + connection.threadId);
    // actionPrompt();
})

connection.query = util.promisify( connection.query );

// connection.end();

module.exports = connection;

