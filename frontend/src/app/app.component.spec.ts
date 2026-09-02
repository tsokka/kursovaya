import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ViewportScroller} from '@angular/common';
import {AppComponent} from './app.component';

describe('AppComponent', () => {
  let viewportScrollerSpy: jasmine.SpyObj<ViewportScroller>;

  beforeEach(async () => {
    viewportScrollerSpy = jasmine.createSpyObj('ViewportScroller', ['setOffset', 'setHistoryScrollRestoration']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: ViewportScroller, useValue: viewportScrollerSpy}
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should set viewport offset on init', () => {
    TestBed.createComponent(AppComponent);
    expect(viewportScrollerSpy.setOffset).toHaveBeenCalledOnceWith([0, 40]);
  });

  it('should set manual scroll restoration on init', () => {
    TestBed.createComponent(AppComponent);
    expect(viewportScrollerSpy.setHistoryScrollRestoration).toHaveBeenCalledOnceWith('manual');
  });
});
