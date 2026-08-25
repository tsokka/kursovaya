import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryType} from "../../../../types/category.type";
import {ActiveParamsType} from "../../../../types/active-params.type";
import {ActiveParamsUtil} from "../../utils/active-params.util";

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent implements OnInit {
  categories: CategoryType[] = [];
  activeParams: ActiveParamsType = {categories: []};
  open: boolean = false;

  constructor(private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.categoryService.getCategories()
      .subscribe((data: CategoryType[]) => {
        this.categories = data;
      });

    this.activatedRoute.queryParams.subscribe(params => {
      this.activeParams = ActiveParamsUtil.processParams(params);
    });
  }

  @HostListener('document:click', ['$event'])
  onOutsideClick(event: MouseEvent): void {
    if (this.open && !this.elementRef.nativeElement.contains(event.target)) {
      this.open = false;
    }
  }

  toggle(): void {
    this.open = !this.open;
  }

  isActive(url: string): boolean {
    return !!this.activeParams.categories && this.activeParams.categories.some(item => item === url);
  }

  updateFilterParam(url: string): void {
    const currentCategories = this.activeParams.categories ? [...this.activeParams.categories] : [];
    const existingIndex = currentCategories.findIndex(item => item === url);

    if (existingIndex !== -1) {
      currentCategories.splice(existingIndex, 1);
    } else {
      currentCategories.push(url);
    }

    this.router.navigate(['/blog'], {
      queryParams: {
        categories: currentCategories,
        page: 1
      }
    });
  }
}
