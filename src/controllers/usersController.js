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

function login(req, res) {
  let username = req.body.username;
  let password = req.body.password;

  if (username == undefined) {
    res.status(400).send('username is required!');
  } else if (password == undefined) {
    res.status(400).send('password is required!');
  } else {
    usersModel
      .getOne(username)
      .then(function (res) {
        if (res.length > 0) {
          if (res[0].password == password) {
            res.status(200).json({
              id: res[0].id,
              username: res[0].username
            });
          } else {
            res.status(403).send('Incorrect username or password!');
          }
        } else {
          res.status(403).send('Incorrect username or password!');
        }
      })
      .catch(function (err) {
        console.log(err);
        console.log('\n Unexpected error to login! Error: ', err.sqlMessage);
        res.status(500).json(err.sqlMessage);
      });
  }
}

module.exports = {
  register,
  login
};
