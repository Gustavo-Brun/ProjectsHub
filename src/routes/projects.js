const express = require('express');
const router = express.Router();
const upload = require('../config/configUpload');

const projectsController = require('../controllers/projectsController');

router.post('/create', upload.single('picture'), function (req, res) {
  projectsController.create(req, res);
});

router.get('/list', function (req, res) {
  projectsController.listAll(req, res);
});

router.get('/:id', function (req, res) {
  projectsController.getById(req, res);
});

module.exports = router;
