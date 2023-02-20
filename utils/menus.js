const { prompt } = require("inquirer");
const SQL = require("./sql.js");
const sql = new SQL();

// View all departments
async function viewAllDepartments() {
  const departments = await sql.viewAllDepartments();
  console.table(departments);
}

// View all roles
async function viewAllRoles() {
  const roles = await sql.viewAllRoles();
  console.table(roles);
}

// View all employees
async function viewAllEmployees() {
  const employees = await sql.viewAllEmployees();
  console.table(employees);
}

// View employees by manager
async function viewEmployeesByManager() {
    await sql.viewEmployeesByManager();
}

// View employees by department
async function viewEmployeesByDepartment() {
    await sql.viewEmployeesByDepartment();
}

// View department budget
async function viewDepartmentBudget() {
    await sql.viewDepartmentBudget();
}

// Add a department
async function addDepartment() {
  await sql.addDepartment();
}

// Add a role
async function addRole() {
  await sql.addRole();
}

// Add an employee
async function addEmployee() {
  await sql.addEmployee();
}

// Update an employee's role
async function updateEmployeeRole() {
  await sql.updateEmployeeRole();
}

// Update an employee's manager
async function updateEmployeeManager() {
  await sql.updateEmployeeManager();
}

// Delete department, role, or employee
async function deleteDepRolEmp() {
  await sql.deleteDepRolEmp();
}

// Prompt the user to select a menu option
async function menus() {
  const { choice } = await prompt({
    name: "choice",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "View Employees by Manager",
      "View Employees by Department",
      "View Total Department Budget",
      "Add Department",
      "Add Role",
      "Add Employee",
      "Update Employee Role",
      "Update Employee Manager",
      "Delete Department, Role, or Employee",
      "Quit",
    ],
  });
  // Call the appropriate method based on the user's choice
  switch (choice) {
    case "View All Departments":
      // Call the method to view all departments
      await viewAllDepartments();
      break;
    case "View All Roles":
      // Call the method to view all roles
      await viewAllRoles();
      break;
    case "View All Employees":
      // Call the method to view all employees
      await viewAllEmployees();
      break;
    case "View Employees by Manager":
      // Call the method to view employees by manager
      await viewEmployeesByManager();
      break;
    case "View Employees by Department":
      // Call the method to view employees by department
        await viewEmployeesByDepartment();
      break;
    case "View Total Department Budget":
      // Call the method to view the total department budget
      await viewDepartmentBudget();
      break;
    case "Add Department":
      // Call the method to add a department
      await addDepartment();
      break;
    case "Add Role":
      // Call the method to add a role
      await addRole();
      break;
    case "Add Employee":
      // Call the method to add an employee
      await addEmployee();
      break;
    case "Update Employee Role":
      // Call the method to update an employee's role
      await updateEmployeeRole();
      break;
    case "Update Employee Manager":
      // Call the method to update an employee's manager
      await updateEmployeeManager();
      break;
    case "Delete Department, Role, or Employee":
      // Call the method to delete a department, role, or employee
      await deleteDepRolEmp();
      break;
    case "Quit":
      console.log("Thank you for using the Avenger Employee Database.");
      process.exit(0); // Exit the application
  }

  await menus(); // Call the menus function again to prompt the user
} // End of menus function

module.exports = menus;
