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
                viewDepartments();
                break;

            case "View Roles":
                viewRoles();
                break;

            case "View Employees":
                viewEmployees();
                break;

            case "Add Departments":
                //function
                break;

            case "Add Roles":
                //function
                break;

            case "Add Employees":
                addEmployee();
                break;

            case "Update Employee Roles":
                //function
                break;

            default:
                connection.end;

        }
    })
};

const viewDepartments = () => {
    connection.query("SELECT * FROM department", (err, items) => {
        if (err) throw err;
        console.table(items);
        userMenu();
    })
};

const viewEmployees = () => {
    connection.query("SELECT * FROM employees", (err, items) => {
        if (err) throw err;
        console.table(items);
        userMenu();
    })
};


const viewRoles = () => {
    connection.query("SELECT * FROM role", (err, items) => {
        if (err) throw err;
        console.table(items);
        userMenu();
    })
};

const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input", // input is default so you could leave this off
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            name: "last_name",
            message: "What is the employee's last name?"
        },
        {
            type: "list",
            name: "role_id",
            message: "What is the employee's role?",
            choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer"]
        },
        {
            type: "list",
            name: "manager_id",
            message: "Who is the employee's manager?",
            choices: ["Jane Doe", "Alice Kravitz", "Jake Peralta", "Raymond Holt"]
        }
    ]).then(({ first_name, last_name, role_id, manager_id }) => { // done as a destructure
        connection.query(
            "INSERT INTO employees SET ?", 
            {
            first_name: first_name,  
            last_name: last_name,
            role_id: role_id,
            manager_id: manager_id
            },
            (err, result) => {
                if (err) throw err;
                console.log(`Successfully added employee '${first_name} ${last_name}!`);
                userMenu();
            }
        ) 
    })
};



connection.connect((err) => {
    if (err) throw err;
    console.log(`Now connected at MySQL at thread ${connection.threadId}`);
    userMenu();
});