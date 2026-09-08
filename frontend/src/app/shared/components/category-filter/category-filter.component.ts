import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {CategoryService} from "../../services";
import {ActivatedRoute, Router} from "@angular/router";
import {ActiveParamsUtil} from "../../utils";
import {CategoryType, ActiveParamsType} from "../../../../types";

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent implements OnInit {
  protected _categories: CategoryType[] = [];
  protected _open: boolean = false;
  private _activeParams: ActiveParamsType = {categories: []};

  constructor(private readonly categoryService: CategoryService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router,
              private readonly elementRef: ElementRef) {
  }

  public ngOnInit(): void {
    this.categoryService.getCategories()
      .subscribe((data: CategoryType[]) => {
        this._categories = data;
      });

    this.activatedRoute.queryParams.subscribe(params => {
      this._activeParams = ActiveParamsUtil.processParams(params);
    });
  }

  @HostListener('document:click', ['$event'])
  public onOutsideClick(event: MouseEvent): void {
    if (this._open && !this.elementRef.nativeElement.contains(event.target)) {
      this._open = false;
    }
  }

  protected _toggle(): void {
    this._open = !this._open;
  }

  protected _isActive(url: string): boolean {
    return !!this._activeParams.categories && this._activeParams.categories.some(item => item === url);
  }

  protected _updateFilterParam(url: string): void {
    const currentCategories = this._activeParams.categories ? [...this._activeParams.categories] : [];
    const existingIndex = currentCategories.findIndex(item => item === url);

    existingIndex !== -1 ? currentCategories.splice(existingIndex, 1) : currentCategories.push(url);

    this.router.navigate(['/blog'], {
      queryParams: {
        categories: currentCategories,
        page: 1
      }
    });
  }
}
