import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerAffectationComponent } from './supprimer-affectation.component';

describe('SupprimerAffectationComponent', () => {
  let component: SupprimerAffectationComponent;
  let fixture: ComponentFixture<SupprimerAffectationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupprimerAffectationComponent]
    });
    fixture = TestBed.createComponent(SupprimerAffectationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
