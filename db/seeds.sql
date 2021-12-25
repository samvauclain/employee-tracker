INSERT INTO departments (name)
VALUES
  ('Sales'),
  ('Marketing'),
  ('Development');

INSERT INTO roles (title, salary, department_id)
VALUES
  ('Sales Person', 70000, 0),
  ('Marketing Manager', 80000, 1),
  ('Developer', 100000, 2),
  ('CEO', 280000, NULL);

-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES
--   ('Andy', 'Samberg', 0, 0),
--   ('Bill', 'Hader', 1, 1),
--   ('Amy', 'Poehler', 2, 2);