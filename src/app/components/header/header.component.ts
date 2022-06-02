import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  public searching!: Boolean;
  private searchingSubscription: Subscription = new Subscription;

  constructor(private state: StateService) { 
    this.searchingSubscription = this.state.searching.subscribe(
      searching => this.searching = searching
    )
  }

  ngOnDestroy(): void {
    this.searchingSubscription.unsubscribe();
  }
}
