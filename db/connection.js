const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'mUu8>a8E-,E>;:7Q',
    database: 'employee_tracker'
  },
  console.log('Connected to the employee tracker database.')
);

module.exports = db;