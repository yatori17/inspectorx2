import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FipPlanComponent } from './fip-plan.component';

describe('FipPlanComponent', () => {
  let component: FipPlanComponent;
  let fixture: ComponentFixture<FipPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FipPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FipPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
