const database = require('../database/config');

function getExistingProject(title, githubUrl) {
  const query = `
        SELECT id FROM Projects WHERE title = '${title}' OR githubUrl = '${githubUrl}';
    `;

  console.log('Running the following query: ' + query);
  return database.executar(query);
}

function create(title, description, picture, author, githubUrl) {
  let query = 'INSERT INTO Projects (title, description, picture, author, githubUrl) VALUES';

  query += ` ("${title}", `;

  if (description) {
    query += `"${description}", `;
  } else {
    query += `null, `;
  }

  if (picture) {
    query += `"${picture}", `;
  } else {
    query += `null, `;
  }

  if (author) {
    query += `"${author}", `;
  } else {
    query += `null, `;
  }

  query += `"${githubUrl}");`;

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

function getById(id) {
  const query = `
        SELECT * FROM Projects LEFT JOIN Reviews ON Projects.id = Reviews.projectId WHERE Projects.id = '${id}';
    `;

  console.log('Running the following query: ' + query);
  return database.executar(query);
}

module.exports = {
  create,
  getExistingProject,
  listAll,
  getById
};
