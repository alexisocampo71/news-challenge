import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Results } from 'src/app/models/results';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnDestroy, OnInit {
  public searching: Boolean = false;
  public searchResults = new Array;
  public searchingSubscription: Subscription = new Subscription;
  public newsStateSubscription: Subscription = new Subscription;
  public error!: String

  constructor(private state: StateService) { 
    this.searchingSubscription = this.state.searching.subscribe(
      searching => this.searching = searching
    )
    this.newsStateSubscription = this.state.newsSubject.subscribe(
      news => {
        this.searchResults = news
      }
    )
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.searchingSubscription.unsubscribe();
    this.newsStateSubscription.unsubscribe();
  }

  public addResults(results: Results): void {
    this.error = '';
    this.state.searching.next(true)
    this.searchResults = []
    results.articles?.map((result: Object) => this.searchResults.push(result))
    if (this.searchResults.length === 0) {
      this.showError('Sorry. No news were founded.')
    }
    this.state.newsSubject.next(this.searchResults)
  }

  public showError(error: String) {
    this.state.newsSubject.next([])
    this.error = error
    console.log(this.error)
  }
}
