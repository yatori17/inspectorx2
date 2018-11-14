import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FipCreateComponent } from './fip-create.component';

describe('FipCreateComponent', () => {
  let component: FipCreateComponent;
  let fixture: ComponentFixture<FipCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FipCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FipCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
