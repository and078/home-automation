const { Router } = require('express');
const stop_stream_controller = require('../controllers/stop_stream_conrtoller');
const app = Router();

app.get('/stop-stream', stop_stream_controller);

module.exports = app;