const database = require('../database/config');

function create(username, password) {
  const query = `
        INSERT INTO Users (username, password) VALUES ('${username}', '${password}');
    `;

  console.log('Running the following query: ' + query);
  return database.executar(query);
}

function getOne(username) {
  const query = `
        SELECT id, username, password FROM Users WHERE username = '${username}';
    `;

  console.log('Running the following query: ' + query);
  return database.executar(query);
}

module.exports = {
  create,
  getOne
};
