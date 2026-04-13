const projectsModel = require('../models/projectsModel');

function create(req, res) {
  const picture = req.file.filename;

  const { moodleId, title, description } = req.body;

  if (moodleId == undefined) {
    res.status(400).send('moodleId is required!');
  } else if (title == undefined) {
    res.status(400).send('title is required!');
  } else
    projectsModel
      .getByMoodleId(moodleId)
      .then(function (res) {
        if (res.length > 0) {
          return res.status(403).send('Project already registered.');
        }
      })
      .catch(function (err) {
        console.log(err);
        console.log('\n Unexpected error to verify project! Error: ', err.sqlMessage);
        return res.status(500).json(err.sqlMessage);
      });

  projectsModel
    .create(moodleId, title, picture, description)
    .then(function (res) {
      res.status(201).json({
        id: res[0].id,
        title: res[0].title
      });
    })
    .catch(function (err) {
      console.log(err);
      console.log('\n Unexpected error to create project! Error: ', err.sqlMessage);
      res.status(500).json(err.sqlMessage);
    });
}

module.exports = {
  create
};
