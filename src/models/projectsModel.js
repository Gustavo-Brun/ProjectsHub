const database = require('../database/config');

function getByMoodleId(moodleId) {
  const query = `
        SELECT id FROM Projects WHERE moodleId = '${moodleId}';
    `;

  console.log('Running the following query: ' + query);
  return database.executar(query);
}

function create(moodleId, title, picture, description) {
  const query = `
        INSERT INTO Projects (moodleId, title, picture, description) VALUES ('${moodleId}', '${title}', '${picture}', '${description}');
    `;

  console.log('Running the following query: ' + query);
  return database.executar(query);
}

function listAll() {
  const query = `
        SELECT * FROM Projects;
    `;

  console.log('Running the following query: ' + query);
  return database.executar(query);
}

module.exports = {
  create,
  getByMoodleId,
  listAll
};
