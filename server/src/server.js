const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const resolver = require('./graphql/resolver');


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    '/graphql', 
    graphqlHTTP({
        schema,
        rootValue: resolver,
        graphiql: true
    })
)

module.exports = { app };