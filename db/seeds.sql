INSERT INTO role (title, salary)
VALUES
  ('Sales Person', 70000),
  ('Marketing Manager', 80000),
  ('Developer', 100000);

INSERT INTO departments (name, role_id)
VALUES
  ('Sales', 1),
  ('Marketing', 2),
  ('Development', 3);

-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES
--   ('Andy', 'Samberg', 0, 0),
--   ('Bill', 'Hader', 1, 1),
--   ('Amy', 'Poehler', 2, 2);