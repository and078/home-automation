import express from 'express';
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

const PORT = 3001;
const app = express();

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

app.listen(PORT, () => {
	console.log(`server listening on port ${PORT}`);
});