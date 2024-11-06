const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const PORT = 3001;
const ABORT_SIGNAL_TIMEOUT = 200;

const app = express();

app.use(helmet());

app.use(bodyParser.json());

app.use(cors());

app.use(morgan('combined'));

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
    },
    {
        name: "esp3",
        type: "toggle",
        url: 'http://192.168.1.181:5555/test',
        state: 0,
    },
    {
        name: "esp4",
        type: "toggle",
        url: 'http://192.168.1.180:5555/test',
        state: 0,
    },
    {
        name: "esp5",
        type: "toggle",
        url: 'http://192.168.1.179:5555/test',
        state: 0,
    },
]

const videoDevices = [
    {
        name: "street-cam",
        type: "video",
        url: "http://188.237.107.39:1234/"
    },
    {
        name: "flat-cam",
        type: "video",
        url: "http://188.237.107.39:1235/"
    },
    {
        name: "back-cam",
        type: "video",
        url: "http://188.237.107.39:1236/"
    },
    {
        name: "test-cam",
        type: "video",
        url: "http://188.237.107.39:1237/"
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
    for(let i = 0; i < devices.length; i++) {
        arr.push(await requestSpecificDevice(devices[i]));
    }
    return arr;
}

const requestVideoDevices = async () => {
    const arr = [];
    for(let i = 0; i < videoDevices.length; i++) {
        arr.push((videoDevices[i]));
    }
    return arr;
}


const handleResponseFromEsp = (response, device, res) => {
    res.send({
        'device': device,
        'status': response,
    });
}

const sendPostRequest = async (localAddress, status, device, res) => {
    try {
        await fetch(localAddress, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: status }),
            signal: AbortSignal.timeout(ABORT_SIGNAL_TIMEOUT)
        })
            .then(response => response.json())
            .then(data => {
                handleResponseFromEsp(data, device, res);
            })
    } catch (error) {
        handleResponseFromEsp(-1, device, res);
        console.log("Api error post to device:", error);
    }
}

app.get('/devices-state', async (req, res) => {
    res.send({data: await requestAllDevices()});
});

app.get('/video-devices', async (req, res) => {
    res.send({data: await requestVideoDevices()});
});

app.post('/device', (req, res) => {
    let url = devices.find(d => d.name === req.body.id).url;
    sendPostRequest(url, req.body.status, req.body.id, res);
});

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});