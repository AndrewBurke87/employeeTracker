const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const department = [];
const roles = [];
const connection = mysql.createConnection({
    host: 'localhost',
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: 'root',
    // Update with your MySQL password!
    password: 'Cubbies87!',
    database: 'employees_DB',
});
connection.connect((err) => {
    if (err) throw err;
    console.log("\n WELCOME TO EMPLOYEE TRACKER \n")
    mainMenu();
})
// Thanks Kelly Cook
function getUpdate() {
    var query = 'SELECT name FROM department';
    connection.query(query, function (err, res) {
        if (err) throw err;
        for (i = 0; i > res.length; i++) {
            department.push(res[i].name)
        }
    })
}
var query = 'SELECT title FROM role';
connection.query(query, function (err, res) {
    if (err) throw err;
    for (i = 0; i > res.length; i++) {
        roles.push(res[i].title)
        updateRole();
    }
})
// Starts prompts for user to select from
function mainMenu() {
    inquirer
        .prompt({
            type: 'list',
            name: 'start',
            message: 'Welcome to our employee database! What would you like to do?',
            choices: [
                'View all employees',
                'View all departments',
                'View all roles',
                'Add an employee',
                'Add a department',
                'Add a role',
                'Update employee role',
                'EXIT'
            ]
        }).then(function (response) {
            switch (response.start) {
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'View all roles':
                    viewRoles();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Update employee role':
                    updateRole();
                    break;
                case 'EXIT':
                    exitApp();
                    break;
                default:
                    break;
            }
        })
};
// View all employees
function viewEmployees() {
    var query = 'SELECT * FROM employee';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log(res.length + ' employees found!');
        console.table('All Employees:', res);
        mainMenu();
    })
};
// View all departments
function viewDepartments() {
    var query = 'SELECT * FROM department';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table('All Departments:', res);
        mainMenu();
    })
};
// View all roles
function viewRoles() {
    var query = 'SELECT * FROM role';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table('All Roles:', res);
        mainMenu();
    })
};
// Add employee 
function addEmployee() {
    connection.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: "What is the employee's first name? ",
                    name: 'first_name'
                },
                {
                    type: 'input',
                    message: "What is the employee's last name? ",
                    name: 'last_name'
                },
                {
                    type: 'input',
                    message: "What is the employee's manager's ID? ",
                    name: 'manager_id'
                },
                {
                    type: 'list',
                    name: 'role',
                    choices: function () {
                        var roleArray = [];
                        for (let i = 0; i < res.length; i++) {
                            roleArray.push(res[i].title);
                        }
                        return roleArray;
                    },
                    message: "What is this employee's role? "
                }
            ]).then(function (response) {
                let role_id;
                for (let a = 0; a < res.length; a++) {
                    if (res[a].title == response.role) {
                        role_id = res[a].id;
                        console.log(role_id)
                    }
                }
                connection.query(
                    'INSERT INTO employee SET ?',
                    {
                        first_name: response.first_name,
                        last_name: response.last_name,
                        manager_id: response.manager_id,
                        role_id: role_id,
                    },
                    function (err) {
                        if (err) throw err;
                        console.log('Your employee has been added!');
                        mainMenu();
                    })
            })
    })
};
// Add department
function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Which department would you like to add?',
                name: 'newDepartment'
            }
        ]).then(function (response) {
            connection.query(
                'INSERT INTO department SET ?',
                {
                    name: response.newDepartment
                });
            var query = 'SELECT * FROM department';
            connection.query(query, function (err, res) {
                if (err) throw err;
                console.log('Your department has been added!');
                console.table('All Departments:', res);
                mainMenu();
            })
        })
};
// Add role
function addRole() {
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: "What new role would you like to add?",
                    name: 'new_role'
                },
                {
                    type: 'input',
                    message: 'What is the salary of this role? (Enter a number)',
                    name: 'salary'
                },
                {
                    type: 'list',
                    name: 'Department',
                    choices: function () {
                        var deptArr = [];
                        for (let i = 0; i < res.length; i++) {
                            deptArr.push(res[i].name);
                        }
                        return deptArr;
                    },
                }
            ]).then(function (response) {
                let department_id;
                for (let a = 0; a < res.length; a++) {
                    if (res[a].name == response.Department) {
                        department_id = res[a].id;
                    }
                }
                connection.query(
                    'INSERT INTO role SET ?',
                    {
                        title: response.new_role,
                        salary: response.salary,
                        department_id: department_id
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.log('New role has been added!');
                        console.table('All Roles:', res);
                        mainMenu();
                    })
            })
    })
};
// Update role
function updateRole() {
    var query = 'SELECT * FROM employee';
    connection.query(query, function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    type: "list",
                    message: "Which employee would you like to update?",
                    name: "employee_id",
                    choices: res.map(employee => ({
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: employee.id
                    }))
                },
            ]).then(({ employee_id }) => {
                var query = `SELECT * FROM role`;
                connection.query(query, function (err, res) {
                    if (err) throw err;
                    inquirer
                        .prompt([
                            {
                                type: "list",
                                message: "What is the employee's new title?",
                                name: "newRole",
                                choices: res.map(role => ({
                                    name: role.title,
                                    value: role.id
                                }))
                            }

                        ]).then(({ newRole }) => {
                            connection.query(
                                `UPDATE employee SET role_id = ${newRole} WHERE id = ${employee_id}`, (err, res) => {
                                    console.log("Title Changed")
                                    mainMenu()
                                }
                            )
                        })

                }
                )
            })
    })
}

// exit the app
function exitApp() {
    connection.end();
};
