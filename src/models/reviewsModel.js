const database = require('../database/config');

function create(projectId, title, text, rating) {
  const query = `
        INSERT INTO Reviews (title, text, rating, projectId) VALUES ('${title}', '${text}', '${rating}', '${projectId}');
    `;

  console.log('Running the following query: ' + query);
  return database.executar(query);
}

module.exports = {
  create
};
