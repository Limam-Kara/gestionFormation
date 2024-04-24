import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAffectationComponent } from './list-affectation.component';

describe('ListAffectationComponent', () => {
  let component: ListAffectationComponent;
  let fixture: ComponentFixture<ListAffectationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAffectationComponent]
    });
    fixture = TestBed.createComponent(ListAffectationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
