const sqlDb = require('./dbConnect.js');

class SQL {
  async viewAllDepartments() {
    return await sqlDb.viewAllDepartments();
  }
}

module.exports = SQL;
