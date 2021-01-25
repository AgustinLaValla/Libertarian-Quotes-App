import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Quote } from './interfaces/Quote.interface';
import { QuotesService } from './services/quotes.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('quote') quote: ElementRef<HTMLInputElement>
  @ViewChild('author') author: ElementRef<HTMLInputElement>
  public quotes: any;
  public update = false;
  public quoteId: string;

  constructor(
    private quotesService: QuotesService,
    private apollo: Apollo
  ) { }

  ngOnInit() {
    this.getQuotes();
  }

  private getQuotes() {
    this.quotes = this.apollo.watchQuery({
      query: this.quotesService.getQuotes()
    }).valueChanges.pipe(
      map((resp: any) => resp.data?.quotes.quotes)
    );
  }

  createQuote(quote: Quote) {
    this.apollo.mutate({
      mutation: this.quotesService.createQuote(),
      variables: quote,
      refetchQueries: [{ query: this.quotesService.getQuotes() }],
    }).subscribe();
  }

  editQuote(quote: Quote) {
    this.author.nativeElement.value = quote.author;
    this.quote.nativeElement.value = quote.quote;
    this.update = true;
    this.quoteId = quote._id;    
  }

  updateQuote(quote: Quote) {
    this.apollo.mutate({
      mutation: this.quotesService.updateQuote(),
      variables: { id: this.quoteId, ...quote },
      refetchQueries: [{ query: this.quotesService.getQuotes() }]
    }).pipe(
      tap({next: () => this.update = false})
    ).subscribe();
  }

  deleteQuote(id: string) {
    this.apollo.mutate({
      mutation: this.quotesService.deleteQuote(),
      variables: { id },
      refetchQueries: [{ query: this.quotesService.getQuotes() }]
    }).subscribe(console.log);
  }

  cancelEdit() {
    this.update = false;
    this.quoteId = null;
    this.author.nativeElement.value = '';
    this.quote.nativeElement.value = '';
    
  }

  onSubmit(quote: Quote) {    
    if(!this.update) {
      this.createQuote(quote);
    } else {
      this.updateQuote(quote);
    }
  }

  ngOnDestroy() {
  }
}
