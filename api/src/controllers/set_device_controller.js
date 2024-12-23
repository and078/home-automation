import mysql from "mysql2";

const db = mysql.createConnection({
	host: '127.0.0.1',
	user: 'and078',
	database: 'home_automation_db',
	password: 'mysqlpswd',
});

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
	try {
		await db.query(TOGGLE_DEVICES_SQL, async (err, result) => {
			if (err) console.log(err);
			let url = result.find(d => d.name === req.body.id).url;
			await requestToESP(url, req.body.status, req.body.id, res);
		});
        db.end();
	} catch (error) {
		console.log(error);
	}
}
