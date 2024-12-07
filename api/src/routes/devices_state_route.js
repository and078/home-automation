import { Router } from 'express';
import devices_state_controller from '../controllers/devices_state_controller.js';
const app = Router();

app.get('/devices-state', devices_state_controller);

export default app;