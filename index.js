const config = require('./config');
const express = require('express');
const app = express();


const HOST = config.get('host');
const PORT = config.get('port');

app.post('/', (req, res) => {
    res.json({ msg: 'ok' });
});

app.listen(PORT, HOST, () => {
    console.log(`Listening on ${HOST}:${PORT}`);
});
