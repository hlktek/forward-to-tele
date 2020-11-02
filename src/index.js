require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const telegramClient = require('./telegram-client');
const {HTTP_SERVER_PORT} = require('./config');
const Service = require('./service')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/telegram', (req, res) => {
    res.status(200).end();
    telegramClient.send(JSON.stringify(req.body));
})
app.post('/',async (req, res) => {
    let response =await Service.send(req.body);
    res.status(200).send(response.data)
})

app.listen(HTTP_SERVER_PORT, () => {
    let msg = `HTTP listening on ${HTTP_SERVER_PORT}`;
    console.log(msg);
});