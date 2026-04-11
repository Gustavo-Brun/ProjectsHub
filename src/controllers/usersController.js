let usersModel = require('../models/usersModel');

function register(req, res) {
  let username = req.body.username;
  let password = req.body.password;

  if (username == undefined) {
    res.status(400).send('username is required!');
  } else if (password == undefined) {
    res.status(400).send('password is required!');
  } else {
    usersModel
      .create(username, password)
      .then(function (res) {
        res.status(201).json(res);
      })
      .catch(function (err) {
        console.log(err);
        console.log('\n Unexpected error to create user! Error: ', err.sqlMessage);
        res.status(500).json(err.sqlMessage);
      });
  }
}

module.exports = {
  register
};
