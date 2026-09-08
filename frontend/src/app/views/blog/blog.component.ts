import {Component, OnInit} from '@angular/core';
import {ArticleService, ActiveParamsUtil, CategoryService} from "../../shared";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleType, ArticlesResponseType, ActiveParamsType, AppliedFilterType, CategoryType} from "../../../types";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  protected _articles: ArticleType[] = [];
  protected _appliedFilters: AppliedFilterType[] = [];
  protected _activeParams: ActiveParamsType = {categories: []};
  protected _pages: number[] = [];
  protected _visiblePages: (number | null)[] = [];
  private _categories: CategoryType[] = [];

  constructor(private readonly articleService: ArticleService,
              private readonly categoryService: CategoryService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router) {
  }

  public ngOnInit(): void {
    this.categoryService.getCategories()
      .subscribe((data: CategoryType[]) => {
        this._categories = data;

        this.activatedRoute.queryParams.subscribe(params => {
          this._activeParams = ActiveParamsUtil.processParams(params);
          if (!this._activeParams.page) {
            this._activeParams.page = 1;
          }

          this._appliedFilters = [];
          this._activeParams.categories?.forEach(url => {
            const foundCategory = this._categories.find(category => category.url === url);
            if (foundCategory) {
              this._appliedFilters.push({name: foundCategory.name, urlParam: foundCategory.url});
            }
          });

          this._getArticles();
        });
      });
  }

  private _getArticles(): void {
    this.articleService.getArticles(this._activeParams)
      .subscribe((data: ArticlesResponseType) => {
        if (this._activeParams.page && this._activeParams.page > data.pages && data.pages > 0) {
          this._openPage(1);
          return;
        }

        this._pages = [];
        for (let i = 1; i <= data.pages; i++) {
          this._pages.push(i);
        }
        this._articles = data.items;
        this._updateVisiblePages();
      });
  }

  private _updateVisiblePages(): void {
    const total = this._pages.length;
    const current = this._activeParams.page || 1;
    const from = Math.max(1, current - 1);
    const to = Math.min(total, current + 1);
    const result: (number | null)[] = [];

    if (from > 1) {
      result.push(null);
    }

    for (let i = from; i <= to; i++) {
      result.push(i);
    }

    if (to < total) {
      result.push(null);
    }

    this._visiblePages = result;
  }

  protected _removeAppliedFilter(appliedFilter: AppliedFilterType): void {
    const currentCategories = (this._activeParams.categories || []).filter(item => item !== appliedFilter.urlParam);
    this.router.navigate(['/blog'], {
      queryParams: {
        categories: currentCategories,
        page: 1
      }
    });
  }

  protected _openPage(page: number): void {
    this.router.navigate(['/blog'], {
      queryParams: {
        categories: this._activeParams.categories || [],
        page: page
      }
    });
  }

  protected _openPrevPage(): void {
    if (this._activeParams.page && this._activeParams.page > 1) {
      this._openPage(this._activeParams.page - 1);
    }
  }

  protected _openNextPage(): void {
    if (this._activeParams.page && this._activeParams.page < this._pages.length) {
      this._openPage(this._activeParams.page + 1);
    }
  }
}
