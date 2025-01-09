import { Router } from 'express';
import cpus_performance_controller from '../controllers/cpus_performance_controller.js';
const app = Router();

app.get('/cpus-performance', cpus_performance_controller);

export default app;