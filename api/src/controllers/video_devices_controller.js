const { exec } = require('node:child_process');

const videoDevices = [
	{
		name: "street-cam",
		type: "video",
		ip: "http://192.168.1.210",
		ws_server_port: 6000,
		status: 0,
	},
	{
		name: "flat-cam",
		type: "video",
		ip: "http://192.168.1.211",
		ws_server_port: 6004,
		status: 0,
	}
]

const IP_NEIGH_FLUSH_ALL = 'sudo ip -s -s neigh flush all';

let activeDevices = [];

const parseStdOut = (out) => {
	let devices = out
		.split('\n\n')[0]
		.split('\n')
		.filter(d => d.includes('REACHABLE'));
	let ips = devices.map(d => d.split(' ')[0]);
	return ips;
}

const getActiveCameras = async () => {

	exec(IP_NEIGH_FLUSH_ALL, async (err, stdout, stderr) => {
		if (err) {
			console.error('error: ', err)
		} else {
			activeDevices = parseStdOut(stdout);
			if(stderr) console.log(`stderr: ${stderr}`);
		}
	})
}

const requestVideoDevices = async (activeDevices) => {
	await getActiveCameras();
	const arr = [];
	for (let i = 0; i < videoDevices.length; i++) {
		activeDevices.forEach(d => {
			if (`http://${d}` === videoDevices[i].ip) videoDevices[i].status = 1;
		})
		arr.push((videoDevices[i]));
	}
	return arr;
}

module.exports = async (req, res) => {
	res.send({ data: await requestVideoDevices(activeDevices) });
}