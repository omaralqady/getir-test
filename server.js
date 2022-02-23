const config = require('./config');
const express = require('express');
const app = express();

const HOST = config.get('host');
const PORT = config.get('port');

let client;


app.post('/', (req, res) => {
    res.json({ msg: 'ok' });
});

app.on('listening', () => {
    console.log(`Listening on ${HOST}:${PORT}`);
});

async function initServer(dbClient) {
    try {
        client = dbClient;
        console.log('Starting server');
        await app.listen(PORT, HOST);
    } catch (err) {
        console.error(`Server failed to start: ${err}`)
        throw err;
    }
}

module.exports = {
    initServer
};
