import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FipDiscrimComponent } from './fip-discrim.component';

describe('FipDiscrimComponent', () => {
  let component: FipDiscrimComponent;
  let fixture: ComponentFixture<FipDiscrimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FipDiscrimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FipDiscrimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
