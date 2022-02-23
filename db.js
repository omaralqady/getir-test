const config = require('./config');
const { MongoClient } = require('mongodb');

async function connectToDB() {
    try {
        console.log('Connecting to DB')
        const client = new MongoClient(config.get('db_uri'));
        await client.connect();
        return client;
    } catch (err) {
        console.error(`Error connecting to DB: ${err}`);
        process.exit(1);
    }
}

module.exports = {
    connectToDB
};
