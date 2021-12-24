const mysql = require('mysql2');

const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'mUu8>a8E-,E>;:7Q',
      database: 'employee_tracker'
    },
    console.log('Connected to the employee tracker database.')
);

db.query(`SELECT * FROM departments`, (err, rows) => {
  console.log(rows);
});

// GET a single department
// db.query(`SELECT * FROM departments WHERE id = 1`, (err, row) => {
//   console.log('single: ')
//   if (err) {
//     console.log(err);
//   }
//   console.log(row);
// });

// Delete a department
// db.query(`DELETE FROM departments WHERE id = ?`, 1, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

// Create a employee
// const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
//               VALUES (?,?,?,?)`;
// const params = ['Andy', 'Samberg', 0, 0];

// db.query(sql, params, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});