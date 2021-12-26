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

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Andy', 'Samberg', 1, 1),
  ('Bill', 'Hader', 2, 2),
  ('Amy', 'Poehler', 3, 3);