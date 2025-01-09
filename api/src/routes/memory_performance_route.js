import { Router } from 'express';
import memory_performance_controller from '../controllers/memory_performance_controller.js';
const app = Router();

app.get('/memory-performance', memory_performance_controller);

export default app;