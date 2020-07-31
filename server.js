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

console.log (`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
**************                                     **************
**************     Welcome to the Employee         **************
**************        Management System            **************
**************                                     **************
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)

const userMenu = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?", //TODO ADD Update Employee Manager, Remove Employee
            choices: ["View Departments", "View Roles", "View Employees", "Add Department", "Add Role", "Add Employee", "Delete Department", "Delete Role", "Delete Employee", "Update Employee Role", "Exit"]
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

            case "Delete Department":
                deleteDepartment();
                break;

            case "Delete Role":
                deleteRole();
                break;

            case "Delete Employee":
                deleteEmployee();
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
    connection.query("SELECT * FROM role", (err, roles) => {
        if (err) throw err;
        
        var roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id
        }));
    connection.query("SELECT * FROM employees", (err, employee) => {
        if (err) throw err;

        var managerChoices = employee.map(({ first_name, last_name, manager_id }) => ({
            first_name: first_name,
            last_name: last_name,
            value: manager_id
        }));

        // var managerChoices = employeeChoices.filter()
    
        
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
            choices:  roleChoices
        },
        {
            type: "list",
            name: "manager_id",
            message: "Who is the employee's manager?",
            choices: managerChoices
        }
    ]).then(({ first_name, last_name, role_id, manager_id }) => { 
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
                console.log(`Successfully added employee '${first_name} ${last_name}'!`);
                userMenu();
            }
        ) 
    })})
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
                console.log(`Successfully added the role!`);
                userMenu();
            }
        ) 
    })
})
};


const deleteDepartment = () => {
    connection.query("SELECT * FROM department", (err, departments) => {
        if (err) throw err;
        
        const deptChoices = departments.map(({ id, name }) => ({
            value: id,
            name: name
            
        }));
        
        
    inquirer.prompt([
        {
            type: "list", 
            name: "id",
            message: "What is the name of the department you'd like to delete?",
            choices: deptChoices
        }
    ]).then(({ id }) => { 
        console.log(id);
        connection.query(
            "DELETE FROM department WHERE id = ?", id,
            
            (err, result) => {
                if (err) throw err;
                console.log(`Successfully deleted department!`);
                userMenu();
            }
        ) 
    })
}) 
};
//TODO Build deleteEmployee
const deleteEmployee = () => {
    connection.query("SELECT * FROM employees", (err, employees) => {
        if (err) throw err;
        
        const empChoices = employees.map(({ id, first_name, last_name }) => ({
            value: id,
            first_name: first_name,
            last_name: last_name
        }));
        console.log(empChoices)
        
    inquirer.prompt([
        {
            type: "list", 
            name: "id",
            message: "What is the name of the employee you'd like to delete?",
            choices: empChoices
        }
    ]).then(({ id }) => { 
        console.log(id);
        connection.query(
            "DELETE FROM employees WHERE id = ?", id,
            
            (err, result) => {
                if (err) throw err;
                console.log(`Successfully deleted employee!`);
                userMenu();
            }
        ) 
    })
})   
};


const deleteRole = () => {
    connection.query("SELECT * FROM role", (err, roles) => {
        if (err) throw err;
        
        const roleChoices = roles.map(({ id, title }) => ({
            value: id,
            name: title
            
        }));
        
        
    inquirer.prompt([
        {
            type: "list", 
            name: "id",
            message: "What is the name of the role you'd like to delete?",
            choices: roleChoices
        }
    ]).then(({ id }) => { 
        console.log(id);
        connection.query(
            "DELETE FROM role WHERE id = ?", id,
            
            (err, result) => {
                if (err) throw err;
                console.log(`Successfully deleted role!`);
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