import mysql from "mysql2/promise";

const ABORT_SIGNAL_TIMEOUT = 200;
const TOGGLE_DEVICES_SQL = 'SELECT * FROM toggle_devices;';

const handleResponseFromEsp = (response, device, res) => {
	res.send({
		'device': device,
		'status': response,
	});
}

const requestToESP = async (localAddress, status, device, res) => {
	try {
		await fetch(localAddress, {
			method: 'POST',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ status: status }),
			signal: AbortSignal.timeout(ABORT_SIGNAL_TIMEOUT)
		})
			.then(response => response.json())
			.then(data => {
				handleResponseFromEsp(data, device, res);
			})
	} catch (error) {
		handleResponseFromEsp(-1, device, res);
		console.log("Api error post to device:", error);
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
			let url = rows.find(d => d.name === req.body.id).url;
			await requestToESP(url, req.body.status, req.body.id, res);
		}
	} catch (error) {
		console.log(error);
	}
	await db.end();
}