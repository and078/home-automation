const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
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
    }
]

const requestSpecificDevice = async (device) => {
    try {
        const response = await fetch(device.url, { signal: AbortSignal.timeout(300) });
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.error("Fucking error: ", error);
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
            signal: AbortSignal.timeout(300)
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

app.post('/device', (req, res) => {
    let url = devices.find(d => d.name === req.body.id).url;
    sendPostRequest(url, req.body.status, req.body.id, res);
});

app.listen(3001, () => {
    console.log('listening on port 3001');
});