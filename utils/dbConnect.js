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

  // This method is used to update an employee's role
  async updateEmployeeRole() {
    // Get all the employees from the database
    const [employeeRows] = await this.pool.execute("SELECT * FROM Employees");

    // Get all the roles from the database
    const [roleRows] = await this.pool.execute("SELECT * FROM Roles");

    // Create an array of objects with the employee's first and last name and id
    const employeeChoices = employeeRows.map((row) => ({
        name: `${row.first_name} ${row.last_name}`,
        value: row.id
    }));

    // Create an array of objects with the role title and id
    const roleChoices = roleRows.map((row) => ({
        name: row.Title,
        value: row.id
    }));

    // Prompt the user to select an employee and role
    const respondWith = await prompt([
        {
            name: "employeeToUpdate",
            type: "list",
            message: "Which employee would you like to update?",
            choices: employeeChoices
        },
        {
            name: "roleToUpdate",
            type: "list",
            message: "What is the new role of the employee?",
            choices: roleChoices
        }
    ]) // End of prompt

    const selectedEmployee = employeeChoices.find((employee) => employee.value === respondWith.employeeToUpdate).name; // Get the name of the employee selected

    const {employeeToUpdate, roleToUpdate} = respondWith; // Destructure the response

    await this.pool.execute(`UPDATE Employees SET role_id = ? WHERE id = ?`, [roleToUpdate, employeeToUpdate]); // Update the employee's role in the database

    console.log(`You have updated ${selectedEmployee}'s Role to ${roleChoices.find((choice) => choice.value === roleToUpdate).name}`); // Display a message to the user

  } // End of updateEmployeeRole()

  // This method is used to update an employee's manager
  async updateEmployeeManager() {
    // Get all the employees from the database
    const [employeeRows] = await this.pool.execute("SELECT * FROM Employees");

    // Get all the managers from the database
    const [managerRows] = await this.pool.execute("SELECT * FROM Employees WHERE manager_id IS NULL")

    // Create an array of objects with the employee's first and last name and id
    const employeeChoices = employeeRows.map((row) => ({
        name: `${row.first_name} ${row.last_name}`,
        value: row.id
    }));

    // Create an array of objects with the managers first and last name and id
    const managerChoices = managerRows.map((row) => ({
        name: `${row.first_name} ${row.last_name}`,
        value: row.id
    }));

    // Prompt the user to select an employee and manager
    const respondWith = await prompt([
        {
            name: "employeeToUpdate",
            type: "list",
            message: "Which employee would you like to update?",
            choices: employeeChoices
        },
        {
            name: "managerToUpdate",
            type: "list",
            message: "Who is the new manager of the employee?",
            choices: managerChoices
        }
    ]) // End of prompt

    const selectedEmployee = employeeChoices.find((employee) => employee.value === respondWith.employeeToUpdate).name; // Get the name of the employee selected

    const {employeeToUpdate, managerToUpdate} = respondWith; // Destructure the response

    await this.pool.execute(`UPDATE Employees SET manager_id = ? WHERE id = ?`, [managerToUpdate, employeeToUpdate]); // Update the employee's manager in the database

    console.log(`You have updated ${selectedEmployee}'s Manager to ${managerChoices.find((choice) => choice.value === managerToUpdate).name}`); // Display a message to the user

  } // End of updateEmployeeManager()

  // This method is used to delete a department, role, or employee
  async deleteDepRolEmp() {
    // Prompt the user to select a department, role, or employee
    const response = await prompt([
        {
            name: "delete",
            type: "list",
            message: "From which of the following would you like to delete?",
            choices: ["A Department", "A Role", "An Employee", "Return to Main Menu"]
        }
    ]) // End of prompt

    // If the user selects department
    if (response.delete === "A Department") {
        // Get all the departments from the database
        const [departmentRows] = await this.pool.execute("SELECT * FROM Departments");

        // Create an array of objects with the department name and id
        const departmentChoices = departmentRows.map((row) => ({
            name: row.Department,
            value: row.id
        }));

        // Prompt the user to select a department
        const respondWith = await prompt([
            {
                name: "departmentToDelete",
                type: "list",
                message: "Which department would you like to delete?",
                choices: [...departmentChoices, "Return to Main Menu"]
            }
        ]) // End of prompt

        // If the user selects return to main menu
        if (respondWith.departmentToDelete === "Return to Main Menu") {
            return; // Return to the main menu
        }
        const {departmentToDelete} = respondWith; // Destructure the response

        await this.pool.execute(`DELETE FROM Departments WHERE id = ?`, [departmentToDelete]); // Delete the department from the database

        console.log(`You have deleted ${departmentChoices.find((choice) => choice.value === departmentToDelete).name} from the database.`); // Display a message to the user

    } // End of department if statement

    // If the user selects role
    else if (response.delete === "A Role") {
        // Get all the roles from the database
        const [roleRows] = await this.pool.execute("SELECT * FROM Roles");

        // Create an array of objects with the role title and id
        const roleChoices = roleRows.map((row) => ({
            name: row.Title,
            value: row.id
        }));

        // Prompt the user to select a role
        const respondWith = await prompt([
            {
                name: "roleToDelete",
                type: "list",
                message: "Which role would you like to delete?",
                choices: [...roleChoices, "Return to Main Menu"]
            }
        ]) // End of prompt

        // If the user selects return to main menu
        if (respondWith.roleToDelete === "Return to Main Menu") {
            return; // Return to the main menu
        }

        const {roleToDelete} = respondWith; // Destructure the response

        await this.pool.execute(`DELETE FROM Roles WHERE id = ?`, [roleToDelete]); // Delete the role from the database

        console.log(`You have deleted ${roleChoices.find((choice) => choice.value === roleToDelete).name} from the database.`); // Display a message to the user
    }

    // If the user selects employee
    else if (response.delete === "An Employee") {
        // Get all the employees from the database
        const [employeeRows] = await this.pool.execute("SELECT * FROM Employees");

        // Create an array of objects with the employee's first and last name and id
        const employeeChoices = employeeRows.map((row) => ({
            name: `${row.first_name} ${row.last_name}`,
            value: row.id
        }));

        // Prompt the user to select an employee
        const respondWith = await prompt([
            {
                name: "employeeToDelete",
                type: "list",
                message: "Which employee would you like to delete?",
                choices: [...employeeChoices, "Return to Main Menu"]
            }
        ]) // End of prompt

        // If the user selects return to main menu
        if (respondWith.employeeToDelete === "Return to Main Menu") {
            return; // Return to the main menu
        }

        const {employeeToDelete} = respondWith; // Destructure the response

        await this.pool.execute(`DELETE FROM Employees WHERE id = ?`, [employeeToDelete]); // Delete the employee from the database

        console.log(`You have deleted ${employeeChoices.find((choice) => choice.value === employeeToDelete).name} from the database.`); // Display a message to the user
    }

    // If the user selects return to main menu
    else if (response.delete === "Return to Main Menu") {
        return; // Return to the main menu
    }
  }

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
