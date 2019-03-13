import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FipTaxaddComponent } from './fip-taxadd.component';

describe('FipTaxaddComponent', () => {
  let component: FipTaxaddComponent;
  let fixture: ComponentFixture<FipTaxaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FipTaxaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FipTaxaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
