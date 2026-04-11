var database = require('../database/config');

function create(username, password) {
  let query = `
        INSERT INTO Users (username, password) VALUES ('${username}', '${password}');
    `;

  console.log('Running the following query: ' + query);
  return database.executar(query);
}

module.exports = {
  create
};
