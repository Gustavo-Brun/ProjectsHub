const usersModel = require('../models/usersModel');

function register(req, res) {
  const { username, password } = req.body;

  if (username == undefined) {
    res.status(400).send('username is required!');
  } else if (password == undefined) {
    res.status(400).send('password is required!');
  } else {
    usersModel
      .getOne(username)
      .then(function (data) {
        if (data.length > 0) {
          return res.status(409).send('Username already in use.');
        } else {
          usersModel
            .create(username, password)
            .then(function (data) {
              res.status(201).json({
                sucess: true,
                userId: data.insertId
              });
            })
            .catch(function (err) {
              console.log(err);
              console.log('\n Unexpected error to create user! Error: ', err.sqlMessage);
              res.status(500).json(err.sqlMessage);
            });
        }
      })
      .catch(function (err) {
        console.log(err);
        console.log('\n Unexpected error to verify user! Error: ', err.sqlMessage);
        return res.status(500).json(err.sqlMessage);
      });
  }
}

function login(req, res) {
  const { username, password } = req.body;

  if (username == undefined) {
    res.status(400).send('username is required!');
  } else if (password == undefined) {
    res.status(400).send('password is required!');
  } else {
    usersModel
      .getOne(username)
      .then(function (data) {
        if (data.length > 0) {
          if (data[0].password == password) {
            res.status(200).json({
              sucess: true,
              userId: data[0].id
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
