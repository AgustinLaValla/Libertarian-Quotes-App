const { buildSchema } = require('graphql');

module.exports = buildSchema(`

    type Quote {
        _id: ID!
        quote: String!
        author: String!
    }

    type QuoteData {
        quotes: [Quote]!
    }

    type RootQuery { 
        quotes: QuoteData!
    }

    input QuoteInputData {
        quote: String!
        author: String!
    }

    input UpdateQuoteInput {
        id: ID!
        quote: QuoteInputData!

    }

    type RootMutation {
        createQuote(quoteInput: QuoteInputData): Quote!
        updateQuote(updateQuoteInput: UpdateQuoteInput): String!
        deleteQuote(id: ID!): String!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);