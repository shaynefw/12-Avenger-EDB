SELECT emp.id, 
emp.first_name, 
emp.last_name, 
role.Title,
dept.Department, 
role.Salary, 
CONCAT(mgr.first_name, ' ', mgr.last_name)
as manager
FROM Employees emp
JOIN Roles role on emp.role_id = role.id
JOIN Departments dept on role.department_id = dept.id
LEFT JOIN Employees mgr on emp.manager_id = mgr.id;

SELECT role.id, role.Title, dept.Department 
FROM Roles role 
JOIN Departments dept on role.department_id = dept.id;


