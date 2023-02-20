const mysql = require("mysql2/promise");
const cTable = require("console.table");

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
