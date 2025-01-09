import mysql from "mysql2/promise";

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
		await fetch(`${localAddress}/set?status=${status}`, { signal: AbortSignal.timeout(ABORT_SIGNAL_TIMEOUT) })
			.then(response => response.json())
			.then(async data => {
				await handleResponseFromEsp(data.status, device, res);
			})
	} catch (error) {
		handleResponseFromEsp(-1, device, res);
		console.log("Api error post to device:", device, error);
	}
}

export default async (req, res) => {
	
	const db = await mysql.createConnection({
		host: '127.0.0.1',
		user: 'and078',
		database: 'home_automation_db',
		password: 'mysqlpswd',
	});
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
	await db.end();
}