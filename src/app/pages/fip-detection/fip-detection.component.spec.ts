import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FipDetectionComponent } from './fip-detection.component';

describe('FipDetectionComponent', () => {
  let component: FipDetectionComponent;
  let fixture: ComponentFixture<FipDetectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FipDetectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FipDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
