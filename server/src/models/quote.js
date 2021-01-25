const { Schema, model } = require('mongoose');


const quoteSchema = new Schema({
    quote: { type: String, required: true },
    author: { type: String, required: true }
})


module.exports = model('Quote', quoteSchema);
