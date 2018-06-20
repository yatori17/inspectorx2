import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawlendComponent } from './crawlend.component';

describe('CrawlendComponent', () => {
  let component: CrawlendComponent;
  let fixture: ComponentFixture<CrawlendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrawlendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
