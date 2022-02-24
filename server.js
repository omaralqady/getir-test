const config = require('./config');
const express = require('express');
const app = express();

const { handler: countDataHandler } = require('./handlers/countData');

const HOST = config.get('host');
const PORT = config.get('port');


app.use(express.json());

app.post('/countData', countDataHandler);

app.on('listening', () => {
    console.log(`Listening on ${HOST}:${PORT}`);
});

async function initServer() {
    try {
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
