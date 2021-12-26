const mysql = require('mysql2');
const inputCheck = require('./utils/inputCheck');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

// Get all roles and their associated departments
app.get('/api/roles', (req, res) => {
  const sql = `SELECT role.*, departments.name 
                AS department_name 
                FROM role 
                LEFT JOIN departments 
                ON role.department_id = departments.id`;
                
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Get single role with associated department
app.get('/api/role/:id', (req, res) => {
  const sql = `SELECT role.*, departments.name
               AS department_name
               FROM role 
               LEFT JOIN departments 
               ON role.department_id = departments.id 
               WHERE role.department_id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});

// Create a role
app.post('/api/role', ({ body }, res) => {
  // role is allowed not to be affiliated with a department
  const errors = inputCheck(
    body,
    'title'
  );
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO role (title) VALUES (?)`;
  const params = [
    body.title,
    body.department_id
  ];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body,
      changes: result.affectedRows
    });
  });
});


// Update a role's department
app.put('/api/role/:id', (req, res) => {
  // Department is allowed to not have an associated role
  const errors = inputCheck(req.body, 'department_id');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `UPDATE role SET department_id = ? 
               WHERE id = ?`;
  const params = [req.body.department_id, req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      // check if a record was found
    } else if (!result.affectedRows) {
      res.json({
        message: 'Role not found'
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});

// Delete a role
app.delete('/api/role/:id', (req, res) => {
  const sql = `DELETE FROM role WHERE id = ?`;
  const params = [req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Role not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

// Get all departments
app.get('/api/departments', (req, res) => {
  const sql = `SELECT * FROM departments`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Get a single department
app.get('/api/department/:id', (req, res) => {
  const sql = `SELECT * FROM departments WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});

// Delete a department
app.delete('/api/department/:id', (req, res) => {
  const sql = `DELETE FROM departments WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
      // checks if anything was deleted
    } else if (!result.affectedRows) {
      res.json({
        message: 'Department not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});