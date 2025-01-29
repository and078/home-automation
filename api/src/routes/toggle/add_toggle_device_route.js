import { Router } from 'express';
import add_toggle_device_controller from '../../controllers/toggle/add_toggle_device_controller.js';
const app = Router();

app.post('/add-toggle-device', add_toggle_device_controller);

export default app;