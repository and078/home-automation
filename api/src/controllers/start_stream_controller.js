import { exec } from 'node:child_process';
import path from 'path';

const __dirname = path.resolve();

const startStream = (port) => {
    try {
        exec(`${__dirname}/bash-scripts/run-stream.sh ${port}`, (err, stdout, stderr) => {
            if (err) {
                console.error('error: ', err)
            } else {
                console.log(port);
                console.log(`stdout: ${stdout}`);
                if (stderr) console.log(`stderr: ${stderr}`);
            }
        })
    } catch (error) {
        console.log(error);
    }
}

export default (req, res) => {
	startStream(req.params.port);
	res.send({ "port": req.params.port });
}