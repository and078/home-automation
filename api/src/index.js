import express from 'express';
import dotenv from 'dotenv';
import { createBDPool } from './database/db.js';
import devices_state_route from './routes/toggle/devices_state_route.js';
import video_devices_route from './routes/video/video_devices_route.js';
import start_stream_route from './routes/video/start_stream_route.js';
import stop_stream_route from './routes/video/stop_stream_route.js';
import set_device_route from './routes/toggle/set_device_route.js';
import camera_flash_route from './routes/video/camera_flash_route.js';
import cpus_performance_route  from './routes/performance/cpus_performance_route.js';
import memory_performance_route from './routes/performance/memory_performance_route.js';
import move_camera_route from './routes/video/move_camera_route.js';
import add_toggle_device_route from './routes/toggle/add_toggle_device_route.js';
import delete_toggle_device_router from './routes/toggle/delete_toggle_device_route.js';
import test_stream_route from './routes/video/test_stream_route.js';
import edit_toggle_device_route from './routes/toggle/edit_toggle_device_route.js';
import video_records_route from './routes/video/video_records_route.js';
import ticker from './services/fetchToggleDevicesTick.js';

dotenv.config();

const PORT = process.env.PORT;
const app = express();

(async () => {
	try {
		const pool = await createBDPool(); 
		app.locals.db = pool;

		app.listen(PORT, () => {
			console.log(`server listening on port ${PORT}`);
		});
		ticker(2000);
	} catch (error) {
		console.error('Failed to initialize application:', error);
		process.exit(1);
	}
})();

app.use(video_records_route);
app.use(devices_state_route);
app.use(video_devices_route);
app.use(start_stream_route);
app.use(stop_stream_route);
app.use(set_device_route);
app.use(camera_flash_route);
app.use(cpus_performance_route);
app.use(memory_performance_route);
app.use(move_camera_route);
app.use(add_toggle_device_route);
app.use(delete_toggle_device_router);
app.use(test_stream_route);
app.use(edit_toggle_device_route);

export default app;