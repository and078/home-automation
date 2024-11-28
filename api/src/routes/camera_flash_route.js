const { Router } = require('express');
const camera_flash_controller = require('../controllers/camera_flash_controller');
const app = Router();

app.get('/camera_flash/:state', camera_flash_controller);

module.exports = app;