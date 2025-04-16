const ADD_TOGGLE_DEVICE_SQL = 'INSERT INTO toggle_devices (name, url, type, state) VALUES '

export default async (req, res) => {
    const { db } = req.api.locals;
    try {
        await db.execute(`${ADD_TOGGLE_DEVICE_SQL}("${req.body.name}", "${req.body.url}", "toggle", -1);`);
        res.send({
            data: {
                name: req.body.name,
                url: req.body.url
            }
        });
    } catch (error) {
        console.log('Db Error', error);
        res.send({
            error: error.code
        });
    }
}