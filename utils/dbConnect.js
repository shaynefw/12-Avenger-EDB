const mysql = require("mysql2/promise");
const cTable = require("console.table");
const { prompt } = require("inquirer");

class Database {
  constructor(connection) {
    this.pool = mysql.createPool(connection); // Create a connection
  }

  // This method is used to view all departments
  async viewAllDepartments() {
    const [rows] = await this.pool.execute("SELECT * FROM Departments");
    console.log(cTable.getTable(rows));
  }

  // This method is used to view all roles
  async viewAllRoles() {
    const [rows] = await this.pool.execute(`
    SELECT role.id, role.Title, dept.Department 
    FROM Roles role 
    JOIN Departments dept on role.department_id = dept.id
    `);
    console.log(cTable.getTable(rows));
  }

  // This method is used to view all employees
  async viewAllEmployees() {
    const [rows] = await this.pool.execute(`
        SELECT emp.id, 
        emp.first_name, 
        emp.last_name, 
        role.Title,
        dept.Department, 
        role.Salary, 
        CONCAT(mgr.first_name, ' ', mgr.last_name)
        as Manager
        FROM Employees emp
        JOIN Roles role on emp.role_id = role.id
        JOIN Departments dept on role.department_id = dept.id
        LEFT JOIN Employees mgr on emp.manager_id = mgr.id;
        `);
    rows.forEach(row => row.Manager ||= ' ')    
    console.log(cTable.getTable(rows));
  }

  // This method is used to add a department
  async addDepartment() {
    const respondWith = await prompt(
        {
            name: "nameOfDepartment",
            type: "input",
            message: "What is the name of the department you would like to add?"
        }
    )
    const departmentName = respondWith.nameOfDepartment;
    await this.pool.execute("INSERT INTO Departments (Department) VALUES (?)", [departmentName])
    console.log(`You have added ${departmentName} to the database.`);
  }

  // This method is used to add a role
  async addRole() {

    // Get all the departments from the database
    const[departmentRows] = await this.pool.execute("SELECT * FROM Departments");

    // Create an array of objects with the department name and id
    const departmentChoices = departmentRows.map((row) => ({
        name: row.Department,
        value: row.id
    }));

    // Prompt the user to select a department
    const respondWith = await prompt([
        {
            name: "nameOfRole",
            type: "input",
            message: "What is the name of the role you would like to add?"
        },
        {
            name: "salaryOfRole",
            type: "input",
            message: "What is the salary of the role you would like to add?"
        },
        {
            name: "departmentOfRole",
            type: "list",
            message: "What department does this role belong to?",
            choices: departmentChoices
        }
    ])

    const {nameOfRole, salaryOfRole, departmentOfRole} = respondWith; // Destructure the response

    await this.pool.execute(`INSERT INTO Roles (title, salary, department_id) VALUES (?, ?, ?)`, [nameOfRole, salaryOfRole, departmentOfRole]); // Add the role to the database

    console.log(`You have added ${nameOfRole} to the database.`); // Display a message to the user

  } // End of addRole()

  // This method is used to add an employee
  async addEmployee() {
    // Get all the roles from the database
    const [roleRows] = await this.pool.execute("SELECT * FROM Roles");

    // Get all the Managers from the database
    const [managerRows] = await this.pool.execute("SELECT * FROM Employees WHERE manager_id IS NULL")

    // Create an array of objects with the role title and id
    const roleChoices = roleRows.map((row) => ({
        name: row.Title,
        value: row.id
    }));

    // Create an array of objects with the managers first and last name and id
    const managerChoices = managerRows.map((row) => ({
        name: `${row.first_name} ${row.last_name}`,
        value: row.id
    }));

    // Prompt the user to select a role and manager
    const respondWith = await prompt([
        {
            name: "firstName",
            type: "input",
            message: "What is the first name of the employee you would like to add?"
        },
        {
            name: "lastName",
            type: "input",
            message: "What is the last name of the employee you would like to add?"
        },
        {
            name: "roleOfEmployee",
            type: "list",
            message: "What is the role of the employee you would like to add?",
            choices: roleChoices
        },
        {
            name: "managerOfEmployee",
            type: "list",
            message: "Who is the manager of this employee?",
            choices: managerChoices
        }
    ]) // End of prompt

    const {firstName, lastName, roleOfEmployee, managerOfEmployee} = respondWith; // Destructure the response

    await this.pool.execute(`INSERT INTO Employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [firstName, lastName, roleOfEmployee, managerOfEmployee]); // Add the employee to the database

    console.log(`You have added ${firstName} ${lastName} to the database.`); // Display a message to the user
    
  } // End of addEmployee()

  async close() {
    await this.pool.end(); // Close the connection
  }

} // End of class Database

// Export an instance of Database
module.exports = new Database({
  host: "localhost",
  user: "root",
  password: "",
  database: "avenger_db",
});
