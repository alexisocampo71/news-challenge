import { Component, Input, OnInit } from '@angular/core';
import { News } from 'src/app/models/news';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() public news!: News
  public descriptionMaxLength: number = 180;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    //make description's max length shorter if title's too long
    if (this.news.title.length > 85) {
      this.descriptionMaxLength = 120
    }
    //replace 'https://www.' from news' author
    if (this.news.author?.includes('https://www.')) {
      this.news.author = this.news.author.replace('https://www.', '')
    }
    //replace other HTTP protocols from news' author
    this.news.author = this.news.author?.replace(/^\/\/|^.*?:(\/\/)?/, '')
    //delete HTML tags from news' description
    this.news.description = this.news.description?.replace(/<\/?[^>]+(>|$)/g, "");
  }

  public showDetails() {
    const navigationExtras: NavigationExtras = {
      state: {
        news: this.news
      }
    }
    this.router.navigate(['detail/', this.news.title], navigationExtras)
  }
}
