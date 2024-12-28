import mysql from "mysql2/promise";

const TOGGLE_DEVICES_SQL = 'SELECT * FROM toggle_devices;';
const ABORT_SIGNAL_TIMEOUT = 500;

const requestSpecificDevice = async (device) => {
	try {
		const response = await fetch(`${device.url}/relay`, { signal: AbortSignal.timeout(ABORT_SIGNAL_TIMEOUT) });
		
		if (response.ok) {
			const res = await response.json();
			return res;
		}
	} catch (error) {
		console.error("SpecificDevice error: ", error);
		return { status: -1, name: device.name, type: device.type };
	}
}

const requestAllDevices = async (devices) => {
	const arr = [];
	if (devices) {
		for (let i = 0; i < devices.length; i++) {
			arr.push(await requestSpecificDevice(devices[i]));
		}
		return arr;
	}
	return arr;
}

export default async (_, res) => {
	const db = await mysql.createConnection({
		host: '127.0.0.1',
		user: 'and078',
		database: 'home_automation_db',
		password: 'mysqlpswd',
	});
	try {
		const [rows] = await db.execute(TOGGLE_DEVICES_SQL);
		res.send({
			data: await requestAllDevices(rows)
		});
	} catch (error) {
		console.log(error);
	}
	await db.end();
}
