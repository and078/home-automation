import mysql from 'mysql2/promise';

const DELETE_TOGGLE_DEVICE_SQL = 'DELETE FROM toggle_devices WHERE id=';

export default async (req, res) => {
    const { db } = req.api.locals;
    try {
        await db.execute(`${DELETE_TOGGLE_DEVICE_SQL}${req.params.id};`);
        res.send({
            data: {
                "deleted_device": req.params.id
            }
        });
    } catch (error) {
        res.send({
            data: {
                "delete error": error.code
            }
        });
    }
}