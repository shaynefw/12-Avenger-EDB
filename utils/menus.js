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
      "Add Department",
      "Add Role",
      "Add Employee",
      "Update Employee Role",
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
    case "Add Department":
      // Call the method to add a department
      break;
    case "Add Role":
      // Call the method to add a role
      break;
    case "Add Employee":
      // Call the method to add an employee
      break;
    case "Update Employee Role":
      // Call the method to update an employee's role
      break;
    case "Quit":
      console.log("Thank you for using the Avenger Employee Database.");
      process.exit(0); // Exit the application
  }

  await menus(); // Call the menus function again to prompt the user
} // End of menus function

module.exports = menus;
