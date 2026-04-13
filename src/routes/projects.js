const express = require('express');
const router = express.Router();
const upload = require('../config/configUpload');

const projectsController = require('../controllers/projectsController');

router.post('/create', upload.single('picture'), function (req, res) {
  projectsController.create(req, res);
});

module.exports = router;
