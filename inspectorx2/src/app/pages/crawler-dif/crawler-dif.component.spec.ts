import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawlerDifComponent } from './crawler-dif.component';

describe('CrawlerDifComponent', () => {
  let component: CrawlerDifComponent;
  let fixture: ComponentFixture<CrawlerDifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrawlerDifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlerDifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
