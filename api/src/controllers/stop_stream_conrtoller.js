const { exec } = require('node:child_process');
const path = require('path');
const PARENT_PATH = path.dirname(path.dirname(__dirname));

const stopStream = () => {
	exec(`${PARENT_PATH}/bash-scripts/kill-stream.sh`, (err, stdout, stderr) => {
		if (err) {
			console.error('error: ', err)
		} else {
			console.log(`stdout: ${stdout}`);
			if (stderr) console.log(`stderr: ${stderr}`);
		}
	})
}

module.exports = (req, res) => {
    	stopStream();
    	res.send({message: "Strean server was killed"});
    }