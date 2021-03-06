import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Article } from '../article';

@Component({
  selector: 'app-show-article',
  templateUrl: './show-article.component.html',
  styleUrls: ['./show-article.component.css'],
})
export class ShowArticleComponent implements OnInit {
  article: Article = {
    _id: '',
    title: '',
    author: '',
    description: '',
    content: '',
    createdAt: '',
  };
  isLoadingResults = true;
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}
  getArticleDetails(id: any) {
    this.api.getArticle(id).subscribe((data: any) => {
      this.article = data;
      console.log(this.article);
      this.isLoadingResults = false;
    });
  }

  deleteArticle(id: any) {
    this.isLoadingResults = true;
    this.api.deleteArticle(id).subscribe(
      (res) => {
        this.isLoadingResults = false;
        this.router.navigate(['/articles']);
      },
      (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }
  ngOnInit(): void {
    this.getArticleDetails(this.route.snapshot.params['id']);
    // this.deleteArticle(this.route.snapshot.params['id']);
  }
}
