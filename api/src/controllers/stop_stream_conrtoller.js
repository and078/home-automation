import { exec } from 'node:child_process';
import path from 'path';

const __dirname = path.resolve();

const stopStream = () => {
	exec(`${__dirname}/bash-scripts/kill-stream.sh`, (err, stdout, stderr) => {
		if (err) {
			console.error('error: ', err)
		} else {
			console.log(`stdout: ${stdout}`);
			if (stderr) console.log(`stderr: ${stderr}`);
		}
	})
}

export default (req, res) => {
    	stopStream();
    	res.send({message: "Strean server was killed"});
    }