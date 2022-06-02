import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { News } from '../models/news';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  public searching = new ReplaySubject<boolean>();
  public newsSubject = new ReplaySubject<Array<News>>();

  constructor() { 
    this.searching.next(false)
  }
}
