// 1. require and import "mysql" and "inquirer"
var mysql = require("mysql");
var inquirer = require("inquirer");
const db = require("./db");
// const { viewRoles, viewEmployees, insertRole } = require("./db");
const connection = require("./db/connection")
// const { createPromptModule } = require("inquirer");



function actionPrompt() { 
    inquirer.prompt({
        name: "action",
        type:"list",
        message: "would you like view [view] a data element, [create] a data element, or [update] employee roles?",
        choices: [ 
            "VIEW_DEPARTMENTS", 
            "VIEW_ROLES", 
            "VIEW_EMPLOYEES", 
            "CREATE_ROLE",
            "CREATE_DEPARTMENT",
            "CREATE_EMPLOYEE",
            "UPDATE_ROLE",
            "UPDATE_MANAGER",
            "VIEW_BY_MANAGER",
            "QUIT" ]
    })
    .then(( res ) => {;

        switch( res.action )  {
            case "VIEW_DEPARTMENTS":
                viewDepartments();
                return;

            case "VIEW_ROLES":
                viewRoles();
                return;

            case "VIEW_EMPLOYEES":
                viewEmployees();
                return;

            case "CREATE_ROLE":
                createRole();
                return;

            case "CREATE_DEPARTMENT":
                createDepartment();
                return;
        
            case "CREATE_EMPLOYEE":
                createEmployee();
                return;

            case "UPDATE_ROLE":
                updateRole();
                return;
            
            case "UPDATE_MANAGER":
                updateManager();
                return;

            case "VIEW_BY_MANAGER":
                viewByManager();
                return;

            default: 
                connection.end()

        }
    });
}

actionPrompt();

function viewDepartments() {
    db
        .getDepartments()

        .then((results) => {
            console.table( results );
            actionPrompt(); 
        })

}

function viewRoles() {
    db
        .getRoles()

        .then((results) => {
            console.table( results );
            actionPrompt(); 
        })

}

function viewEmployees() {
    db
        .getEmployees()

        .then((results) => {
            console.table( results );
            actionPrompt(); 
        })

}

function createRole() {
    db
        .getDepartments( )
        .then(( department ) => {

            // console.table( department )

            inquirer
                .prompt([
                    {
                        message: "What department is this role in?",
                        type: "list",
                        name: "department_id",
                        choices: department.map( (department) =>({
                            value:department.id,
                            name: department.dept_name
                        }))
                    },
                    {
                        message: "What is the description for this role?",
                        type: "input",
                        name: "employee_role",
                    },
                    {
                        message: "What is employees salary?",
                        type: "input",
                        name: "employee_salary",
                    }
                ]).then(( response ) => {
                    // console.log( response );
                    var newRole = {
                        title: response.employee_role,
                        salary: Number(response.employee_salary),
                        dept_id: Number(response.department_id)
                    }
                    db.insertRole( newRole );
                    viewRoles();
                })
        })
}

function createDepartment() {
    inquirer
        .prompt([
            {
                message: "What department would you like to add?",
                type: "input",
                name: "department",
            }
        ]).then(( response ) => {
            // console.log( response );
            var newDept = {
                dept_name: response.department,
            }
            db.insertDepartment( newDept );
            viewDepartments();
        })
}

function createEmployee() {
    db
        .getEmployees_Roles( )
        .then(( role_emp ) => {

            // console.table( role_emp )

            inquirer
                .prompt([
                    {
                        message: "What is the title of this employees role?",
                        type: "list",
                        name: "role_id",
                        choices: role_emp.map( ( role_emp ) =>({
                            value: role_emp.id,
                            name: role_emp.title
                        }))
                    },
                    {
                        message: "What is the employees first name?",
                        type: "input",
                        name: "first_name",
                    },
                    {
                        message: "What is the employees last name?",
                        type: "input",
                        name: "last_name",
                    },
                    {
                        message: "What is the manager's name?",
                        type: "list",
                        name: "manager_id",
                        choices: role_emp.map( ( role_emp ) =>({
                            value: role_emp.id,
                            name: role_emp.first_name + " " + role_emp.last_name
                        }))
                    }
                ]).then(( response ) => {
                    // console.log( response );
                    var newEmployee = {
                        first_name: response.first_name,
                        last_name: response.last_name,
                        role_id: Number(response.role_id),
                        manager_id: Number(response.manager_id)

                    }
                    db.insertEmployee( newEmployee );
                    viewEmployees();
                })
        })
}

function updateRole() {
    db
        .getEmployees_Roles( )
        .then(( role_emp ) => {

            console.table( role_emp );

            inquirer
                .prompt([
                    {
                        message: "What is the name of the employee whose role you would like to update",
                        type: "list",
                        name: "employee_id",
                        choices: role_emp.map( ( role_emp ) =>({
                            value: role_emp.id,
                            name: role_emp.first_name + " " + role_emp.last_name
                        }))
                    },
                    {
                        message: "What new role do you want to assign?",
                        type: "list",
                        name: "role_id",
                        choices: role_emp.map( ( role_emp ) =>({
                            value: role_emp.role_id,
                            name: role_emp.title
                        }))
                    }

                ]).then(( response ) => {
                    var updatedRole = 
                    [
                        {
                            role_id: response.role_id
                        },
                        {
                            id: response.employee_id
                        }
                        
                    ]
                    console.log( updatedRole );
                    db.updateRole( updatedRole );
                    viewEmployees();
                })
        })
}

function updateManager() {
    db
        .getEmployees( )
        .then(( mgr_emp ) => {

            console.table( mgr_emp );

            inquirer
                .prompt([
                    {
                        message: "What is the name of the employee whose manager you would like to update",
                        type: "list",
                        name: "employee_id",
                        choices: mgr_emp.map( ( mgr_emp ) =>({
                            value: mgr_emp.id,
                            name: mgr_emp.first_name + " " + mgr_emp.last_name
                        }))
                    },
                    {
                        message: "Who would you like to make their manager?",
                        type: "list",
                        name: "manager_id",
                        choices: mgr_emp.map( ( mgr_emp ) =>({
                            value: mgr_emp.id,
                            name: mgr_emp.first_name + " " + mgr_emp.last_name
                        }))
                    }

                ]).then(( response ) => {
                    var updatedManager = 
                    [
                        {
                            manager_id: response.manager_id
                        },
                        {
                            id: response.employee_id
                        }
                        
                    ]
                    console.log( updatedManager );
                    db.updateManager( updatedManager );
                    viewEmployees();
                })
        })
}

function viewByManager() {
    db
        .getEmployees( )
        .then(( mgr_emp ) => {

            // console.table( mgr_emp );

            inquirer
                .prompt([
                    {
                        message: "What is the name of the manager whose employees you would like to view",
                        type: "list",
                        name: "manager_id",
                        choices: mgr_emp.map( ( mgr_emp ) =>({
                            value: mgr_emp.id,
                            name: mgr_emp.first_name + " " + mgr_emp.last_name
                        }))
                    }

                ]).then(( response ) => {
                    var managerId = 
                    [
                        {
                            manager_id: response.manager_id
                        }
                    ]
                    // console.log( managerId );
                    db.managerGroup( managerId )
                    .then((results) => {
                        console.table( results );
                        actionPrompt(); 
                    });
                    // viewEmployees();
                })
        })
}
