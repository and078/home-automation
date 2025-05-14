import { Router } from 'express';
import video_devices_controller from '../../controllers/video/video_devices_controller.js';

const app = Router();
app.get('/video-devices', video_devices_controller);

export default app;