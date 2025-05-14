import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { log } from 'console';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



export default async (req, res) => {
    const directory = path.join(__dirname, '../../../video-records');
    const filename = req.body.video;
    fs.unlink(`${directory}/${filename}`, (err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`File ${filename} deleted successifully`);        
    })
    res.send(`fle ${filename} was deleted successifully`)
}