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

const esps = {
    lolin: 'http://192.168.1.185:5555/test',
    esp: 'http://192.168.1.184:5556/test',
}

const handleResponseFromEsp = (response, device, res) => {
    res.send({
        'status': response,
        'device': device,
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
            body: JSON.stringify({ status: status })
        }).then(response => response.json())
          .then(response => handleResponseFromEsp(response, device, res))
    } catch (error) {
        console.log(error.message);
    }
}

app.get('/all-devices-status', (req, res) => {
    
});


app.post('/device', (req, res) => {
    sendPostRequest(esps[req.body.id], req.body.status, req.body.id, res);
});

app.listen(3001, () => {
    console.log('listening on port 3001');
});