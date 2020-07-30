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
            message: "What would you like to do?", //TODO ADD Update Employee Manager, Remove Employee
            choices: ["View Departments", "View Roles", "View Employees", "Add Department", "Add Role", "Add Employee", "Update Employee Role", "Exit"]
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

            case "Add Department":
                addDepartment();
                break;

            case "Add Role":
                addRole();
                break;

            case "Add Employee":
                addEmployee();
                break;

            case "Update Employee Role":
                //function
                break;

            //TODO: Add these later
            // case "Update Employee Manager":
            //     //function
            //     break;

            // case "Remove Employee":
            //     //function
            //     break;

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
            type: "input",
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

const addDepartment = () => {
    inquirer.prompt([
        {
            type: "input", 
            name: "name",
            message: "What is the name of the department you'd like to add?"
        }
    ]).then(({ name }) => { 
        connection.query(
            "INSERT INTO department SET ?", 
            {
            name: name
            },
            (err, result) => {
                if (err) throw err;
                console.log(`Successfully added department '${name}!`);
                userMenu();
            }
        ) 
    })
};

const addRole = () => {
    connection.query("SELECT * FROM department", (err, departments) => {
        if (err) throw err;
        var roleChoices = departments.map(item => departments.name);
        const deptChoices = departments.map(({ id, name }) => ({
            name: name,
            value: id
        }));
        console.log(roleChoices)
        console.log(deptChoices)
    
    inquirer.prompt([
        {
            type: "input", 
            name: "title",
            message: "What is the title of the new role?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the annual salary?"
        },
        {
            type: "rawlist",
            name: "department_id",
            message: "What department is the role in?",
            choices: deptChoices
        }
    ]).then(({ title, salary, department_id }) => { 
        connection.query(
            "INSERT INTO role SET ?", 
            {
            title: title,
            salary: salary,
            department_id: department_id
            },
            (err, result) => {
                if (err) throw err;
                console.log(`Successfully added the role !`);
                userMenu();
            }
        ) 
    })
})
};


connection.connect((err) => {
    if (err) throw err;
    console.log(`Now connected at MySQL at thread ${connection.threadId}`);
    userMenu();
});