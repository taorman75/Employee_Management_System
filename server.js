const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Highgate7575!",
    port: 3306,
    database: "employee_tracker"
});

const userMenu = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: ["View Departments", "View Roles", "View Employees", "Add Departments", "Add Roles", "Add Employees", "Update Employee Roles", "Exit"]
        }
    ]).then(({ action }) => {
        switch(action) {
            case "View Departments":
                //function
                break;

            case "View Roles":
                //function
                break;

            case "View Employees":
                //function
                break;

            case "Add Departments":
                //function
                break;

            case "Add Roles":
                //function
                break;

            case "Add Employees":
                //function
                break;

            case "Update Employee Roles":
                //function
                break;

            default:
                connection.end;

        }
    })
};