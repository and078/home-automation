const TOGGLE_DEVICES_SQL = 'SELECT * FROM toggle_devices;';
const ABORT_SIGNAL_TIMEOUT = 1000;

const requestSpecificDevice = async (device) => {
	try {
		const response = await fetch(`${device.url}/relay`, { signal: AbortSignal.timeout(ABORT_SIGNAL_TIMEOUT) });
		if (response.ok) {
			const data = await response.json();
			data.id = device.id;
			data.url = device.url;
			return data;
		}
	} catch (error) {
		console.error(`SpecificDevice (${device.name}) url: ${device.url} error: `, error.message);
		return { status: -1, name: device.name, type: device.type, id: device.id, url: device.url };
	}
}

const requestAllDevices = async (devices) => {
	const results = [];
	await Promise.allSettled(
		devices.map(d => requestSpecificDevice(d))
	)
		.then(rs => rs.forEach(r => results.push(r.value)));
	return results;
}

export default async (req, res) => {
	const { db } = req.app.locals;
	try {
		let devices = [];
		const [rows] = await db.execute(TOGGLE_DEVICES_SQL);
		if (rows) {
			devices = await requestAllDevices(rows);
			if (devices) {
				res.send({
					data: devices
				});
			}
		}
	} catch (error) {
		console.log('DB_ERROR', error);
	}
}
