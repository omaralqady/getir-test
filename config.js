const convict = require('convict');
require('dotenv').config();

const config = convict({
    env: {
        default: 'dev',
        env: 'NODE_ENV'
    },
    host: {
        default: '127.0.0.1',
        env: 'HOST'
    },
    port: {
        format: 'port',
        default: 8080,
        env: 'PORT'
    },
    db_uri: {
        default: 'mongodb://testuser:password@localhost/testdb',
        env: 'DB_URI'
    },
});

module.exports = config;
