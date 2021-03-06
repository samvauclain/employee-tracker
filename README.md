# Employee Tracker

Video demo can be seen here https://watch.screencastify.com/v/763tuv2IvXmMsesdLlvg

AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

GIVEN a command-line application that accepts user input

WHEN I start the application
- THEN I am presented with the following options: 
    - view all departments
    - view all roles
    - view all employees
    - add a department
    - add a role
    - add an employee
    - Update an employee role

WHEN I choose to view all departments
- THEN I am presented with a formatted table showing department names and department ids

WHEN I choose to view all roles
- THEN I am presented with the 
    - job title
    - role id
    - the department that role belongs to
    - the salary for that role

WHEN I choose to view all employees
- THEN I am presented with a formatted table showing employee data, including 
    - employee ids
    - first names
    - last names
    - job titles
    - departments
    - salaries
    - managers that the employees report to

WHEN I choose to add a department
- THEN I am prompted to enter the name of the department and that department is added to the database

WHEN I choose to add a role
- THEN I am prompted to enter the 
    - name
    - salary
    - department 
    - role is added to the database

WHEN I choose to add an employee
- THEN I am prompted to enter the 
    - employee’s first name
    - last name
    - role
    - manager
    - employee is added to the database

WHEN I choose to update an employee role
- THEN I am prompted to select an employee to update and their new role and this information is updated in the database