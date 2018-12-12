import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingfipComponent } from './rankingfip.component';

describe('RankingfipComponent', () => {
  let component: RankingfipComponent;
  let fixture: ComponentFixture<RankingfipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankingfipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingfipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
