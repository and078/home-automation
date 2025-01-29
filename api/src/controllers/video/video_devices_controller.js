import mysql from "mysql2/promise";

const VIDEO_DEVICES_SQL = 'SELECT * FROM video_devices;';

export default async (_, res) => {
	const db = await mysql.createConnection({
		host: '127.0.0.1',
		user: 'and078',
		database: 'home_automation_db',
		password: 'mysqlpswd',
	});
	try {
		const [rows] = await db.execute(VIDEO_DEVICES_SQL);
		if (rows) {
			await res.send({
				data: rows,
			})
		}
	} catch (error) {
		console.log(error);
	}
	await db.end();
}