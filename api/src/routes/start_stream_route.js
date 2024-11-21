const { Router } = require('express');
const start_stream_controller = require('../controllers/start_stream_controller');
const app = Router();

app.get('/start-stream/:port', start_stream_controller);

module.exports = app;