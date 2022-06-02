import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { News } from 'src/app/models/news';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
  public news!: News

  constructor(private router: Router, private state: StateService) { 
    const navigation = this.router.getCurrentNavigation();
    this.news = navigation?.extras.state?.['news']
    if (!this.news) {
      this.router.navigate(['/'])
    }
  }

  ngOnInit(): void {
    //delete HTML tags from news' content
    if (this.news.content) {
      this.news.content = this.news.content?.replace(/<\/?[^>]+(>|$)/g, "");
    }
  }
}
