const ABORT_SIGNAL_TIMEOUT = 200;

const devices = [
	{
		name: "lolin",
		type: "toggle",
		url: 'http://192.168.1.185:5555/test',
		state: 0,
	},
	{
		name: "esp",
		type: "toggle",
		url: 'http://192.168.1.184:5555/test',
		state: 0,
	},
	{
		name: "esp1",
		type: "toggle",
		url: 'http://192.168.1.183:5555/test',
		state: 0,
	},
	{
		name: "esp2",
		type: "toggle",
		url: 'http://192.168.1.182:5555/test',
		state: 0,
	}
]

const requestSpecificDevice = async (device) => {
	try {
		const response = await fetch(device.url, { signal: AbortSignal.timeout(ABORT_SIGNAL_TIMEOUT) });
		if (response.ok) {
			return await response.json();
		}
	} catch (error) {
		console.error("SpecificDevice error: ", error.message);
		return { status: -1, name: device.name, type: device.type };
	}
}

const requestAllDevices = async () => {
	const arr = [];
	for (let i = 0; i < devices.length; i++) {
		arr.push(await requestSpecificDevice(devices[i]));
	}
	return arr;
}

export default async (req, res) => {
	res.send({ data: await requestAllDevices() });
}