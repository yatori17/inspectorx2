import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullinspecComponent } from './fullinspec.component';

describe('FullinspecComponent', () => {
  let component: FullinspecComponent;
  let fixture: ComponentFixture<FullinspecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullinspecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullinspecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
