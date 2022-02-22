const convict = require('convict');

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
    }
});

module.exports = config;
