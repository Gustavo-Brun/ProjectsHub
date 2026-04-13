let express = require('express');
let router = express.Router();

let usersController = require('../controllers/usersController');

router.post('/signup', function (req, res) {
  usersController.register(req, res);
});

router.post('/login', function (req, res) {
  usersController.login(req, res);
});

module.exports = router;
