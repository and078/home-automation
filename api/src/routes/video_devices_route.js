const { Router } = require('express');
const video_devices_controller = require('../controllers/video_devices_controller');
const app = Router();

app.get('/video-devices', video_devices_controller);

module.exports = app;