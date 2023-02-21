-- insert departments
INSERT INTO Departments (Department) 
VALUES ('Medical'), 
('Engineering'), 
('Science'), 
('Security'), 
('Intelligence');

-- insert roles
INSERT INTO Roles (Title, Salary, department_id)
VALUES ('Doctor', 250000, 1), 
('Lead Doctor', 400000, 1), 
('Engineer', 105000, 2),
('Lead Engineer', 140000, 2), 
('Scientist', 85000, 3),
('Lead Scientist', 125000, 3), 
('Security', 80000, 4),
('Lead Security', 95000, 4), 
('Intelligence', 100000, 5),
('Lead Intelligence', 156000, 5);

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
