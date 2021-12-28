const express = require('express');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');
const inquirer = require('inquirer');
const conTab = require('console.table');

function startApp() {
  inquirer
      .prompt({
          type: 'list',
          name: 'options',
          message: 'What would you like to do?',
          choices: ["View all departments", "View all roles", "Quit"]
      })
      .then(({ options }) => {
          switch (options) {
              case "View all departments":
                  viewDept();
                  break;
              case "View all roles":
                  viewRoles();
                  break;
              case "Quit":
                  console.log("Goodbye!")
                  break;
          }
      })
}

function viewDept() {
  console.log("test viewing department");
}

function viewRoles() {
  console.log("test viewing roles");
}

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

startApp();