const ABORT_SIGNAL_TIMEOUT = 1000;
const TOGGLE_DEVICES_SQL = 'SELECT * FROM toggle_devices;';

const handleResponseFromEsp = async (response, device, res) => {
	await res.send({
		'device': device,
		'status': response,
	});
}

const requestToESP = async (localAddress, status, device, res) => {
	try {
		const response = await fetch(`${localAddress}/set?status=${status}`, { signal: AbortSignal.timeout(ABORT_SIGNAL_TIMEOUT) });
		const data = await response.json();
		if(data) {
			await handleResponseFromEsp(data.status, device, res);
		}
	} catch (error) {
		console.log("Api error post to device:", device, error.message);
	}
}


export default async (req, res) => {

	const { db } = req.app.locals;
	try {
		const [rows] = await db.execute(TOGGLE_DEVICES_SQL);
		if(rows) {			
			let device = rows.find(d => d.name === req.query.name);
			await requestToESP(device.url, req.query.state, req.query.name, res);
			await db.execute(`UPDATE toggle_devices SET state = ${req.query.state} WHERE name = "${req.query.name}";`);
		}
	} catch (error) {
		console.log(error);
	}
}
