const { Router } = require('express');
const set_device_controller = require('../controllers/set_device_controller');
const bodyParser = require('body-parser');
const app = Router();

app.use(bodyParser.json());
app.post('/device', set_device_controller);

module.exports = app;