const { connectToDB } = require('./db');
const { initServer } = require('./server');


function main() {

    connectToDB()
        .then((dbClient) => (initServer(dbClient)))
        .catch((err) => {
            console.error(`Error initializing app: ${err}`);
            process.exit(1);
        });
}

main();
