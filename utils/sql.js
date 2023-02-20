const sqlDb = require("./dbConnect.js");

class SQL {
  // View all departments
  async viewAllDepartments() {
    return await sqlDb.viewAllDepartments();
  }

  // View all roles
  async viewAllRoles() {
    return await sqlDb.viewAllRoles();
  }

  // View all employees
  async viewAllEmployees() {
    return await sqlDb.viewAllEmployees();
  }

  // Add a department
  async addDepartment(departmentName) {
    return await sqlDb.addDepartment(departmentName);
  }

  // Add a role
  async addRole(roleTitle, roleSalary, departmentId) {
    return await sqlDb.addRole(roleTitle, roleSalary, departmentId);
  }

  // Add an employee
  async addEmployee(firstName, lastName, roleId, managerId) {
    return await sqlDb.addEmployee(firstName, lastName, roleId, managerId);
  }
} // End of class SQL

module.exports = SQL;
