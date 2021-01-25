const { app } = require('./server');
const { connectDb } = require('./db');
const { magenta } = require('colors');
const schema = require('./graphql/schema');

async function main() {
    console.log(schema);
    await connectDb();
    await app.listen(4000);
    console.log(`${magenta('Server on Port: 4000')}`)
}

main();