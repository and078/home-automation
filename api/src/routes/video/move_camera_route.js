import { Router } from 'express';
import move_camera_controller from '../../controllers/video/move_camera_controller.js';
const app = Router();

app.get('/move_camera/:port&:direction', move_camera_controller);

export default app;