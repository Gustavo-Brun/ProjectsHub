const projectsModel = require('../models/projectsModel');

function create(req, res) {
  const picture = req.file?.filename;
  const { title, githubUrl, description, userId } = req.body;

  if (githubUrl == undefined) {
    res.status(400).send('githubUrl is required!');
  } else if (title == undefined) {
    res.status(400).send('title is required!');
  } else if (userId == undefined) {
    res.status(400).send('userId is required!');
  } else
    projectsModel
      .getExistingProject(title, githubUrl)
      .then(function (data) {
        if (data.length > 0) {
          return res.status(409).send('Project already registered.');
        } else {
          projectsModel
            .create(title, githubUrl, picture, description, userId)
            .then(function (data) {
              res.status(201).send();
            })
            .catch(function (err) {
              console.log(err);
              console.log('\n Unexpected error to create project! Error: ', err.sqlMessage);
              res.status(500).json(err.sqlMessage);
            });
        }
      })
      .catch(function (err) {
        console.log(err);
        console.log('\n Unexpected error to verify project! Error: ', err.sqlMessage);
        return res.status(500).json(err.sqlMessage);
      });
}

function listAll(req, res) {
  projectsModel
    .listAll()
    .then(function (data) {
      res.status(200).json(data);
    })
    .catch(function (err) {
      console.log(err);
      console.log('\n Unexpected error to list projects! Error: ', err.sqlMessage);
      res.status(500).json(err.sqlMessage);
    });
}

function getById(req, res) {
  const { id } = req.params;

  if (id == undefined) {
    res.status(400).send('param id is required!');
  }

  projectsModel
    .getById(id)
    .then(function (data) {
      res.status(200).json(data);
    })
    .catch(function (err) {
      console.log(err);
      console.log('\n Unexpected error to get project details! Error: ', err.sqlMessage);
      res.status(500).json(err.sqlMessage);
    });
}

function update(req, res) {
  const { id } = req.params;
  const { userId, column, value } = req.body;

  if (id == undefined) {
    res.status(400).send('param id is required!');
  }

  if (userId == undefined) {
    res.status(400).send('user id is required!');
  }

  projectsModel
    .getById(id)
    .then(function (data) {
      if (data[0].fkUser !== Number(userId)) {
        res.status(403).send('Unauthorized user');
      } else {
        projectsModel
          .update(id, column, value)
          .then(function (data) {
            res.status(200).send();
          })
          .catch(function (err) {
            console.log(err);
            console.log('\n Unexpected error to update project! Error: ', err.sqlMessage);
            res.status(500).json(err.sqlMessage);
          });
      }
    })
    .catch(function (err) {
      console.log(err);
      console.log('\n Unexpected error to get project! Error: ', err.sqlMessage);
      return res.status(500).json(err.sqlMessage);
    });
}

module.exports = {
  create,
  listAll,
  getById,
  update
};
