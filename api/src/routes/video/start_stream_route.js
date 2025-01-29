import { Router } from 'express';
import start_stream_controller from '../../controllers/video/start_stream_controller.js';
const app = Router();

app.get('/start-stream/:port', start_stream_controller);

export default app;