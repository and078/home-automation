const { exec } = require('node:child_process');
const path = require('path');
const PARENT_PATH = path.dirname(path.dirname(__dirname));

const startStream = (port) => {
    try {
        exec(`${PARENT_PATH}/bash-scripts/run-stream.sh ${port}`, (err, stdout, stderr) => {
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

module.exports = (req, res) => {
	startStream(req.params.port);
	res.send({ "port": req.params.port });
}