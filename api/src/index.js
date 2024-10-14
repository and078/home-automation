const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

const ads = [
    { title: 'Hello, world (again)!' }
];


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
    esp: 'http://192.168.1.184:80/test',
}


const sendPostRequest = async (localAddress, status) => {
    
    await fetch(localAddress, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: status })
    }).then(res => res.json())
      .then(res => console.log(res))
}

app.get('/', (req, res) => {
    console.log(req);
    res.send(ads);
});

app.post('/', (req, res) => {
    let device = req.body.id;
    sendPostRequest(esps[device], req.body.status);
    res.send("ok");
});

app.listen(3001, () => {
    console.log('listening on port 3001');
});