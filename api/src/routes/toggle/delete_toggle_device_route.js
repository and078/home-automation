import { Router } from 'express';
import delete_toggle_device_controller from '../../controllers/toggle/delete_toggle_device_controller.js'

const app = Router();

app.delete('/delete-toggle-device/:id', delete_toggle_device_controller);

export default app;