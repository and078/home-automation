import { parentPort, workerData } from 'worker_threads';

const requestSpecificDevice = async (device) => {
	try {
		const response = await fetch(`${device.url}/relay`, { signal: AbortSignal.timeout(ABORT_SIGNAL_TIMEOUT) });
		if (response.ok) {
			const data = await response.json();
			data.id = device.id;
			data.url = device.url;
			return data;
		}
	} catch (error) {
		console.error(`SpecificDevice (${device.name}) error: `, error);
		return { status: -1, name: device.name, type: device.type, id: device.id, url: device.url };
	}
}