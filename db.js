const config = require('./config');
const { MongoClient } = require('mongodb');

let client;

async function connectToDB() {
    try {
        console.log('Connecting to DB')
        client = new MongoClient(config.get('db_uri'));
        await client.connect();
    } catch (err) {
        console.error(`Error connecting to DB: ${err}`);
        process.exit(1);
    }
}

async function getClient() {
    if (!client.topology.isConnected() || !client) {
        await connectToDB();
    }
    return client;
}

module.exports = {
    connectToDB,
    getClient
};
