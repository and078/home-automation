import { Router } from 'express';
import set_device_controller from '../controllers/set_device_controller.js';
import bodyParser from 'body-parser';
const app = Router();

app.use(bodyParser.json());
app.get('/device', set_device_controller);

export default app;