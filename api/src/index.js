import express from 'express';
import devices_state_route from './routes/devices_state_route.js';
import video_devices_route from './routes/video_devices_route.js';
import start_stream_route from './routes/start_stream_route.js';
import stop_stream_route from './routes/stop_stream_route.js';
import set_device_route from './routes/set_device_route.js';
import camera_flash_route from './routes/camera_flash_route.js';
import cpus_performance_route  from './routes/cpus_performance_route.js';
import memory_performance_route from './routes/memory_performance_route.js';

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

app.listen(PORT, () => {
	console.log(`server listening on port ${PORT}`);
});

