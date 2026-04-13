const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

router.post('/signup', function (req, res) {
  usersController.register(req, res);
});

router.post('/login', function (req, res) {
  usersController.login(req, res);
});

module.exports = router;
