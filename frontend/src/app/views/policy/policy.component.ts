import {AfterViewInit, Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ViewportScroller} from "@angular/common";

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements AfterViewInit {

  constructor(private activatedRoute: ActivatedRoute,
              private viewportScroller: ViewportScroller) {
  }

  ngAfterViewInit(): void {
    const fragment = this.activatedRoute.snapshot.fragment;
    if (fragment) {
      document.fonts.ready.then(() => {
        this.viewportScroller.scrollToAnchor(fragment);
      });
    }
  }
}
