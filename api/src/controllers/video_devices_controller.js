import mysql from "mysql2";

const db = mysql.createConnection({
	host: '127.0.0.1',
	user: 'and078',
	database: 'home_automation_db',
	password: 'mysqlpswd',
});

const VIDEO_DEVICES_SQL = 'SELECT * FROM video_devices;';


const requestVideoDevices = async (activeDevices) => {
	await getActiveCameras();
	const arr = [];
	for (let i = 0; i < videoDevices.length; i++) {
		activeDevices.forEach(d => {
			if (`http://${d}` === videoDevices[i].ip) videoDevices[i].status = 1;
			else videoDevices[i].status = 0;
		})
		arr.push((videoDevices[i]));
	}
	return arr;
}

export default async (req, res) => {
	try {
		await db.query(VIDEO_DEVICES_SQL, async (err, result) => {
			if (err) console.log(err);		
			await res.send({
				data: result
			});
		});
        db.end();
	} catch (error) {
		console.log(error);
	}
}
