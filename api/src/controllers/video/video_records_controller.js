import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async (req, res) => {
    const videosDirectory = path.join(__dirname, '../../../video-records');

    fs.readdir(videosDirectory, (err, files) => {
        if (err) {
            console.log('Reading files error: ', err);
            return res.status(500).json({ error: 'Server error' });
        }

        const url = `http://${req.get('host')}`;
        const links = files.map(f =>
            `${url}/video-records/${f}`,
        );

        res.json({
            links: links
        });
    })
}