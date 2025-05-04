import { Router } from 'express';
import video_records_controller from '../../controllers/video/video_records_controller.js';

const app = Router();
app.get('/video-records', video_records_controller);

export default app;