import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, filter, Subscription } from 'rxjs';
import { Results } from 'src/app/models/results';
import { NewsService } from 'src/app/services/news.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit, OnDestroy {
  @Output() public searchResults = new EventEmitter<Results>();
  @Output() public searchError = new EventEmitter<String>();

  public searchForm!: FormGroup;
  private searchFormSubscription: Subscription = new Subscription;

  constructor(private newsService: NewsService, private state: StateService) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.searchFormSubscription.add(this.searchForm.get('search')?.valueChanges
      .pipe(
        debounceTime(500),
        filter(query => query.length > 2))
      .subscribe({
        next: (data) => {this.newsSearch(data)},
        error: (e) => this.sendError(e)
      }))
    this.searchFormSubscription.add(this.searchForm.get('search')?.valueChanges
      .pipe(
        debounceTime(500),
        filter(query => query.length < 1))
      .subscribe(() => {
        this.state.searching.next(false)
        this.state.newsSubject.next([])
      }))
  }

  ngOnDestroy(): void {
    this.searchFormSubscription.unsubscribe();
  }

  public newsSearch(query: string): void {
    this.newsService.search(query).subscribe(result => this.searchResults.emit(result))
  }

  private buildForm(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
    });
  }

  private sendError(e: String) {
    this.searchError.emit(e)
  }
}
