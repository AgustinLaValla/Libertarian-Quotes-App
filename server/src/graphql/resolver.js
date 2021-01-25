const Quote = require('../models/quote');

module.exports = {
    quotes: async () => {
        const quotes = await Quote.find();

        return {
            quotes: quotes.map(q => ({ _id: q._id, quote: q.quote, author: q.author }))
        }
    },

    createQuote: async ({ quoteInput }) => {
        const { quote, author } = quoteInput;
        const newQuote = Quote.create({ quote, author });

        return newQuote;
    },

    updateQuote: async ({ updateQuoteInput }) => {
        const { id, quote } = updateQuoteInput;

        await Quote.findByIdAndUpdate(id, quote);

        return 'Quote Successfully Removed';

    },

    deleteQuote: async ({ id }) => {

        console.log(id);
        await Quote.findByIdAndRemove(id);
        return 'Quote Successfully Deleted';

    }
}