let express = require('express');
let router = express.Router();

let usersController = require('../controllers/usersController');

router.post('/singup', function (req, res) {
  usersController.register(req, res);
});

module.exports = router;
