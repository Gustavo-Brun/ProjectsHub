var database = require('../database/config');

function create(username, password) {
  let query = `
        INSERT INTO Users (username, password) VALUES ('${username}', '${password}');
    `;

  console.log('Running the following query: ' + query);
  return database.executar(query);
}

function getOne(username) {
  let query = `
        SELECT id, username, password FROM Users WHERE username = '${username}';
    `;

  console.log('Running the following query: ' + query);
  return database.executar(query);
}

module.exports = {
  create,
  getOne
};
