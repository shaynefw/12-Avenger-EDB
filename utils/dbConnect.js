const mysql = require('mysql2/promise');
const cTable = require('console.table');

class Database {
  constructor(connection) {
    this.pool = mysql.createPool(connection); // Create a connection 
  }

  // This method is used to view all departments
  async viewAllDepartments() {
    const [rows] = await this.pool.execute('SELECT * FROM Departments');
    console.log(cTable.getTable(rows));
  }

  async close() {
    await this.pool.end();
  }
} // End of class Database

// Export an instance of Database
module.exports = new Database({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'avenger_db'
});
