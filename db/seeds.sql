INSERT INTO departments (name)
VALUES
  ('Sales'),
  ('Marketing'),
  ('Development');

INSERT INTO role (title, salary, department_id)
VALUES
  ('Sales Person', 70000, 1),
  ('Marketing Manager', 80000, 2),
  ('Developer', 100000, 3);

-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES
--   ('Andy', 'Samberg', 0, 0),
--   ('Bill', 'Hader', 1, 1),
--   ('Amy', 'Poehler', 2, 2);