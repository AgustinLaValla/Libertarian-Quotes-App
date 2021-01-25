const { connect } = require('mongoose');
const { yellow } = require('colors');

async function connectDb() {
    await connect('mongodb://localhost/angular-graphql-crud', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

    console.log(`${yellow('DATABASE IS CONNECTED')}`);
}

module.exports = { connectDb };