import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../../shared/services/article.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleType} from "../../../types/article.type";
import {ActiveParamsType} from "../../../types/active-params.type";
import {ActiveParamsUtil} from "../../shared/utils/active-params.util";
import {ArticlesResponseType} from "../../../types/articles-response.type";
import {AppliedFilterType} from "../../../types/applied-filter.type";
import {CategoryService} from "../../shared/services/category.service";
import {CategoryType} from "../../../types/category.type";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  articles: ArticleType[] = [];
  categories: CategoryType[] = [];
  appliedFilters: AppliedFilterType[] = [];
  activeParams: ActiveParamsType = {categories: []};
  pages: number[] = [];

  constructor(private articleService: ArticleService,
              private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.categoryService.getCategories()
      .subscribe((data: CategoryType[]) => {
        this.categories = data;

        this.activatedRoute.queryParams.subscribe(params => {
          this.activeParams = ActiveParamsUtil.processParams(params);

          this.appliedFilters = [];
          this.activeParams.categories?.forEach(url => {
            const foundCategory = this.categories.find(category => category.url === url);
            if (foundCategory) {
              this.appliedFilters.push({name: foundCategory.name, urlParam: foundCategory.url});
            }
          });

          this.getArticles();
        });
      });
  }

  getArticles(): void {
    this.articleService.getArticles(this.activeParams)
      .subscribe((data: ArticlesResponseType) => {
        this.pages = [];
        for (let i = 1; i <= data.pages; i++) {
          this.pages.push(i);
        }
        this.articles = data.items;
      });
  }

  removeAppliedFilter(appliedFilter: AppliedFilterType): void {
    const currentCategories = (this.activeParams.categories || []).filter(item => item !== appliedFilter.urlParam);
    this.router.navigate(['/blog'], {
      queryParams: {
        categories: currentCategories,
        page: 1
      }
    });
  }
}
