import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FipResultsComponent } from './fip-results.component';

describe('FipResultsComponent', () => {
  let component: FipResultsComponent;
  let fixture: ComponentFixture<FipResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FipResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FipResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
