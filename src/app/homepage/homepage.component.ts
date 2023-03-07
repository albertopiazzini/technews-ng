import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  allNewsId: Array<number>;
  newsId: Array<number>;
  news: Array<any> = [];
  i = 0;

  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.service.getAllNews().subscribe((data: any) => {
      this.allNewsId = data;
      this.loadNews();
    });
  }

  loadNews() {
    this.newsId = this.allNewsId.slice(0, this.i + 10);
    while (this.i < this.newsId.length) {
      this.service.getOneNews(this.newsId[this.i]).subscribe((el) => {
        this.news.push(el);
      });
      this.i++;
    }
  }

  addNews() {
    this.loadNews();
  }
}
