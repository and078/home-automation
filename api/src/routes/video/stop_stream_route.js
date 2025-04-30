import { Router } from 'express';
import stop_stream_controller from '../../controllers/video/stop_stream_conrtoller.js';
const app = Router();

app.get('/stop-stream/:port', stop_stream_controller);

export default app;