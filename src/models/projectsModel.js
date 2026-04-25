const database = require('../database/config');

function getExistingProject(title, githubUrl) {
  const query = `
        SELECT id FROM Projects WHERE title = '${title}' OR githubUrl = '${githubUrl}';
    `;

  console.log('Running the following query: ' + query);
  return database.executar(query);
}

function create(title, description, picture, author, githubUrl) {
  const treatedDescription = description ? `${description}` : null;
  const treatedPicture = picture ? `${picture}` : null;
  const treatedAuthor = author ? `${author}` : null;

  const query = `
        INSERT INTO Projects (title, description, picture, author, githubUrl) VALUES ('${title}', ${treatedDescription}, ${treatedPicture}, ${treatedAuthor}, '${githubUrl}');
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
