const mysql = require('mysql2');
const inputCheck = require('./utils/inputCheck');
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
      // password: 'mUu8>a8E-,E>;:7Q',
      password: '20Red4l1fe19!',
      database: 'employee_tracker'
    },
    console.log('Connected to the employee tracker database.')
);

// Get all roles
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

// Get a single role
app.get('/api/role/:id', (req, res) => {
  
  const sql = `SELECT role.*, departments.name 
  AS deparment_name 
  FROM role 
  LEFT JOIN departments 
  ON role.department_id = departments.id 
  WHERE role.id = ?`;

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

// Create a role
app.post('/api/role', ({ body }, res) => {
  const errors = inputCheck(body, 'title', 'salary', 'department_id');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

const sql = `INSERT INTO role (first_name, last_name, role_id, manager_id)
VALUES (?,?,?,?)`;

const params = [body.first_name, body.last_name, body.role_id, body.manager_id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });

});

// Get departments
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

// Get department ID
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

// Delete departments
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

// Update a deptartment role
app.put('/api/department/:id', (req, res) => {
  
  const errors = inputCheck(req.body, 'role_id');

  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `UPDATE departments SET role_id = ? 
               WHERE id = ?`;
  const params = [req.body.role_id, req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      // check if a record was found
    } else if (!result.affectedRows) {
      res.json({
        message: 'Department not found'
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

// Get all employees
// app.get('/api/employees', (req, res) => {
//   const sql = `SELECT * FROM employee`;

//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: rows
//     });
//   });
// });

// Get a single employee
// app.get('/api/employee/:id', (req, res) => {
//   const sql = `SELECT * FROM employee WHERE id = ?`;
//   const params = [req.params.id];

//   db.query(sql, params, (err, row) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: row
//     });
//   });
// });

// Delete a employee
// app.delete('/api/employee/:id', (req, res) => {
//   const sql = `DELETE FROM employee WHERE id = ?`;
//   const params = [req.params.id];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.statusMessage(400).json({ error: res.message });
//     } else if (!result.affectedRows) {
//       res.json({
//         message: 'Employee not found'
//       });
//     } else {
//       res.json({
//         message: 'deleted',
//         changes: result.affectedRows,
//         id: req.params.id
//       });
//     }
//   });
// });

// Create a employee
// app.post('/api/employee', ({ body }, res) => {
//   const errors = inputCheck(body, 'first_name', 'last_name', 'role_id', 'manager_id');
//   if (errors) {
//     res.status(400).json({ error: errors });
//     return;
//   }

// const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
// VALUES (?,?,?,?)`;

// const params = [body.first_name, body.last_name, body.role_id, body.manager_id];
//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: body
//     });
//   });

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