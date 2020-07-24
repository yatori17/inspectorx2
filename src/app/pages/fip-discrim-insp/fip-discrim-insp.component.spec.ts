import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FipDiscrimInspComponent } from './fip-discrim-insp.component';

describe('FipDiscrimInspComponent', () => {
  let component: FipDiscrimInspComponent;
  let fixture: ComponentFixture<FipDiscrimInspComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FipDiscrimInspComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FipDiscrimInspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
