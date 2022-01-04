const express = require('express');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');
const inquirer = require('inquirer');
const conTab = require('console.table');
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', apiRoutes);

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

function initialQuestions() {
  inquirer
    .prompt({
      type: 'list',
      name: 'options',
      message: 'What would you like to do?',
      choices: ["View all departments", "View all roles", "View all employees", "View all employees by manager", "Add a department", "Add a role", "Update an employee role", "Quit"]
    })
    .then(({ options }) => {
      switch (options) {
        case "View all departments":
          viewDeptartment();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "View all employees by manager":
          viewEmployeesByManager();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Update an employee role":
          updateRole();
          break;
        case "Quit":
          quitMessage();
      }
    })
}

function viewDeptartment() {
  const sql = `SELECT departments.name AS Departments, departments.id FROM departments;`
  db.query(sql, (err, res) => {
    console.table(res)
    inquirer.prompt({
      type: 'confirm',
      name: 'confirm',
      message: 'Back to main menu? Reply "n" to exit.'
    })
      .then(data => {
        if (data.confirm) {
          initialQuestions()
        }
        else {
          quitMessage();
        }
      })
  })
}

function viewRoles() {
  const sql = `
   SELECT role.title AS Title, role.id, departments.name AS Department, 
   role.salary
   FROM role
   LEFT JOIN departments ON role.department_id = departments.id;
   `
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res)
    inquirer.prompt({
      type: 'confirm',
      name: 'confirm',
      message: 'Back to main menu?'
    })
      .then(data => {
        if (data.confirm) {
          initialQuestions()
        }
        else {
          quitMessage();
        }
      })
  })
}

function viewEmployees() {
  const sql = `
  SELECT employee.id, employee.first_name, employee.last_name, 
  role.title AS role, role.salary AS salary, 
  departments.name AS department, 
  manager_id AS Manager
  FROM employee
  LEFT JOIN role ON employee.role_id = role.id
  LEFT JOIN departments ON role.department_id = departments.id;
  `
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res)
    inquirer.prompt({
      type: 'confirm',
      name: 'confirm',
      message: 'Back to main menu?'
    })
      .then(data => {
        if (data.confirm) {
          initialQuestions()
        }
        else {
          quitMessage();
        }
      })
  })
}

function viewEmployeesByManager() {
  const sql = `
  SELECT employee.id, employee.first_name, employee.last_name, 
  role.title AS role, role.salary AS salary, 
  departments.name AS department, 
  manager_id AS Manager
  FROM employee
  LEFT JOIN role ON employee.role_id = role.id
  LEFT JOIN departments ON role.department_id = departments.id;
  `
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res)
    inquirer.prompt({
      type: 'confirm',
      name: 'confirm',
      message: 'Back to main menu?'
    })
      .then(data => {
        if (data.confirm) {
          initialQuestions();
        }
        else {
          quitMessage();
        }
      })
  })
}

function addDepartment() {
  const sql = `INSERT INTO departments (name) VALUES (?)`
  inquirer
    .prompt({
      type: 'text',
      name: 'department',
      message: 'Please enter a new department name.'
    })
    .then(function ({ department }) {
      db.query(sql, (department), (err) => {
        if (err) throw err;
        console.log(`${department} added.`);
        initialQuestions();
      })
    })
}

function addRole() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'roleTitle',
      message: "Please enter role title",
    },
    {
      type: 'input',
      name: 'roleSalary',
      message: "Please add the role's annual salary",
    },
    {
      type: 'input',
      name: 'department',
      message: "Which department id will this role be tied to?",
    }
  ]).then(function (answer) {
    db.connect(function (err) {
      if (err) throw err;
      db.query('INSERT INTO role SET ?', {
        title: answer.roleTitle,
        salary: answer.roleSalary,
        department_id: answer.department
      },
        function (err) {
          if (err) throw err;
          console.log(`${answer.roleTitle} added.`);
          initialQuestions();
        });
    })
  });
}

function updateRole() {
  db.query('SELECT first_name, last_name FROM employee', (err, result) => {
    if (err) throw err
    
    const employeeRoster = result.map(({ first_name, last_name }) => ({ name: first_name + " " + last_name }))

    db.query('SELECT id, title FROM role', (err, result) => {
      if (err) throw err
      const roles = result.map(({ id, title }) => ({ name: title, value: id }))
      console.log("ROLES:", roles)
      inquirer
        .prompt([{
          type: 'list',
          name: 'name',
          message: 'who\'s role would you like to update?',
          choices: employeeRoster
        },
        {
          type: 'list',
          name: 'role',
          message: 'What is their new role?',
          choices: roles
        }
        ]).then(function ({ role, name }) {
          const sql = `UPDATE employee SET role_id = ${role} WHERE CONCAT(first_name, ' ', last_name) = '${name}'`;

          // console.log("ROLE, NAME:", role, name)
          db.query(sql, (err) => {
            if (err) throw err
            console.log('Employee updated to their new role.')
            initialQuestions();
          })

        })
    })
  })
  
}

function quitMessage() {
  // console.log('Please hit control c to quit');
  db.end(function (err) {
    console.log('Goodbye. Please hold control and type c to quit.')
  })

  return;
}

initialQuestions();

// `UPDATE employee SET role_id = ? WHERE id = ?;`

// `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?)`