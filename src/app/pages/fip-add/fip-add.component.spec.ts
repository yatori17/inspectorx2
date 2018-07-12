import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FipAddComponent } from './fip-add.component';

describe('FipAddComponent', () => {
  let component: FipAddComponent;
  let fixture: ComponentFixture<FipAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FipAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FipAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
