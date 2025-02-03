import { Router } from 'express';
import test_stream_controller from '../../controllers/video/test_stream_controller.js';

const app = Router();

app.get('/stream', test_stream_controller);

export default app;