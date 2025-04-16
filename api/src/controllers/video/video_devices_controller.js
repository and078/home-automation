const VIDEO_DEVICES_SQL = 'SELECT * FROM video_devices;';

export default async (req, res) => {
	const { db } = req.app.locals;
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
}