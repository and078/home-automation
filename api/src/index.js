const express = require('express');
const devices_state_route = require('./routes/devices_state_route');
const video_devices_route = require('./routes/video_devices_route');
const start_stream_route = require('./routes/start_stream_route');
const stop_stream_route = require('./routes/stop_stream_route');
const set_device_route = require('./routes/set_device_route');

const PORT = 3001;
const app = express();

app.use(devices_state_route);
app.use(video_devices_route);
app.use(start_stream_route);
app.use(stop_stream_route);
app.use(set_device_route);

app.listen(PORT, () => {
	console.log(`server listening on port ${PORT}`);
});