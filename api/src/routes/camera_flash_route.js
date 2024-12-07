import { Router }from 'express';
import camera_flash_controller from '../controllers/camera_flash_controller.js';
const app = Router();

app.get('/camera_flash/:port&:state', camera_flash_controller);

export default app;