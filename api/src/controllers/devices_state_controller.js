import mysql from "mysql2";

const TOGGLE_DEVICES_SQL = 'SELECT * FROM toggle_devices;';
const ABORT_SIGNAL_TIMEOUT = 300;

const db = mysql.createConnection({
	host: '127.0.0.1',
	user: 'and078',
	database: 'home_automation_db',
	password: 'mysqlpswd',
});

const requestSpecificDevice = async (device) => {
	try {
		const response = await fetch(device.url, { signal: AbortSignal.timeout(ABORT_SIGNAL_TIMEOUT) });
		if (response.ok) {
			return await response.json();
		}
	} catch (error) {
		console.error("SpecificDevice error: ", error.message);
		return { status: -1, name: device.name, type: device.type };
	}
}

const requestAllDevices = async (devices) => {
	const arr = [];
	for (let i = 0; i < devices.length; i++) {
		arr.push(await requestSpecificDevice(devices[i]));
	}
	return arr;
}

export default async (_, res) => {
	try {
		await db.query(TOGGLE_DEVICES_SQL, async (err, result) => {
			if (err) console.log(err);		
			res.send({
				data: await requestAllDevices(result)
			});
		});
        db.end();
	} catch (error) {
		console.log(error);
	}
}
