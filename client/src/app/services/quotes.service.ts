import { Injectable } from '@angular/core';
import gql from 'graphql-tag';


@Injectable({ providedIn: 'root' })
export class QuotesService {
    constructor() { }

    getQuotes() {
        return gql`
        {
            quotes {
                quotes {
                    _id
                    quote
                    author
                }
            }
        }
        `
    }

    createQuote() {
        return gql`
          mutation createQuote($quote: String!, $author: String!) {
              createQuote(quoteInput: { quote: $quote, author: $author }) {
                    _id
                    quote,
                    author
                }
            }
        `;
    }

    updateQuote() {
        return gql`
          mutation updateQuote($id: ID!, $quote: String!, $author: String!) {
              updateQuote(updateQuoteInput: {
                  id: $id,
                  quote: { quote: $quote, author: $author }
              })
          }
        `;
    }

    deleteQuote() {
        return gql`
          mutation deleteQuote($id: ID!) {
              deleteQuote(id: $id)
          }
        `;
    }
}