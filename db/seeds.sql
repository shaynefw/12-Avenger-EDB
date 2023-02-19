-- insert departments
INSERT INTO Departments (name) 
VALUES ('Armoury'), 
('Medical'), 
('Engineering'), 
('Science'), 
('Security'), 
('Intelligence');

-- insert roles
INSERT INTO Roles (title, salary, department_id)
VALUES ('Doctor', 80000, 2), 
('Nurse', 70000, 2), 
('Engineer', 60000, 3), 
('Scientist', 50000, 4), 
('Security', 40000, 5), 
('Intelligence', 30000, 6);

-- insert employees
INSERT INTO Employees (first_name, last_name, role_id, manager_id) 
VALUES ('Tony', 'Stark', 1, 1), 
('Steve', 'Rogers', 2, 2), 
('Bruce', 'Banner', 3, 3), 
('Natasha', 'Romanoff', 4, 4), 
('Clint', 'Barton', 5, NULL), 
('Thor', 'Odinson', 6, 6);
