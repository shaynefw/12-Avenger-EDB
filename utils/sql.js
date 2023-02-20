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

} // End of class SQL

module.exports = SQL;
