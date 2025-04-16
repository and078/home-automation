import mysql from 'mysql2/promise';

const EDIT_TOGGLE_DEVICE = "UPDATE toggle_devices SET ";

export default async (req, res) => {
    const { db } = req.api.locals;
    try {
        await db.execute(`${EDIT_TOGGLE_DEVICE} name="${req.body.name}", url="${req.body.url}" WHERE id=${req.params.id}`);
        res.send({
            "body": req.body,
            "params": req.params
        });
    } catch (error) {
        res.send({
            "Patch error": error
        });
    }
}