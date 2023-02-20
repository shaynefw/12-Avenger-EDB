-- insert departments
INSERT INTO Departments (Department) 
VALUES ('Medical'), 
('Engineering'), 
('Science'), 
('Security'), 
('Intelligence');

-- insert roles
INSERT INTO Roles (Title, Salary, department_id)
VALUES ('Doctor', 80000, 1), 
('Lead Doctor', 90000, 1), 
('Engineer', 60000, 2),
('Lead Engineer', 70000, 2), 
('Scientist', 50000, 3),
('Lead Scientist', 60000, 3), 
('Security', 40000, 4),
('Lead Security', 50000, 4), 
('Intelligence', 30000, 5),
('Lead Intelligence', 40000, 5);

-- insert employees
ALTER TABLE Employees AUTO_INCREMENT = 1; -- why does auto_increment not start at 1?
INSERT INTO Employees (first_name, last_name, role_id, manager_id) 
VALUES ('Steven', 'Strange', 2, NULL),
('Tony', 'Stark', 4, NULL),
('Bruce', 'Banner', 6, NULL),
('Steve', 'Rogers', 8, NULL), 
('Nick', 'Fury', 10, NULL),
('Victoria', 'Montesi', 1, 1),
('Hank', 'Pym', 3, 2),
('Hank', 'McCoy', 5, 3),
('Thor', 'Odinson', 7, 4),
('Natasha', 'Romanoff', 9, 5), 
('Clint', 'Barton', 9, 5);
