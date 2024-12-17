import mysql from "mysql2";

const db = mysql.createConnection({
	host: '127.0.0.1',
	user: 'and078',
	database: 'home_automation_db',
	password: 'mysqlpswd',
});

db.connect((err) => {
	if (err) {
		console.error('Error connecting to MySQL: ' + err.stack);
		return;
	}
	console.log('Connected to MySQL as ID ' + db.threadId);
});


const sql = 'SELECT * FROM test;';

const dbDataRequest = async (query) => {
	return new Promise((resolve, reject) => {
		db.query(query, (err, res) => {
			if (err) {
				return reject(err);
			}
			resolve(res);
		});
	});
}

const getUser = async () => {
	try {
		const result = await dbDataRequest(sql);
		return result;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

const ABORT_SIGNAL_TIMEOUT = 300;

const devices = [
	{
		name: "lolin",
		type: "toggle",
		url: 'http://192.168.1.185:5555/test',
		state: 0,
	},
	{
		name: "esp",
		type: "toggle",
		url: 'http://192.168.1.184:5555/test',
		state: 0,
	},
	{
		name: "esp1",
		type: "toggle",
		url: 'http://192.168.1.183:5555/test',
		state: 0,
	},
	{
		name: "esp2",
		type: "toggle",
		url: 'http://192.168.1.182:5555/test',
		state: 0,
	}
]

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

const requestAllDevices = async () => {
	const arr = [];
	for (let i = 0; i < devices.length; i++) {
		arr.push(await requestSpecificDevice(devices[i]));
	}
	return arr;
}

export default async (req, res) => {
	res.send({
		data: await requestAllDevices(),
		sql: await getUser()
	});
}