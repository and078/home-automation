const { Router } = require('express');
const devices_state_controller = require('../controllers/devices_state_controller');
const app = Router();

app.get('/devices-state', devices_state_controller);

module.exports = app;