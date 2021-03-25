import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgHscrollContainerComponent } from './ng-hscroll-container.component';

describe('NgHscrollContainerComponent', () => {
  let component: NgHscrollContainerComponent;
  let fixture: ComponentFixture<NgHscrollContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgHscrollContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgHscrollContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
