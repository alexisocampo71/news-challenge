import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private API_URI = 'https://newsapi.org/v2/everything?'
  private API_KEY = '8c4d4fd71c3f4cddbc288468031b7235'

  constructor(private http: HttpClient) { }

  public search(query: string): Observable<any> {
    let params = new HttpParams;
    params = params.append('q', query);
    params = params.append('pageSize', 10);
    params = params.append('apiKey', this.API_KEY);
    return this.http.get(`${this.API_URI}`,{params: params})
  }
}
