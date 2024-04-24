import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerEvaluationComponent } from './supprimer-evaluation.component';

describe('SupprimerEvaluationComponent', () => {
  let component: SupprimerEvaluationComponent;
  let fixture: ComponentFixture<SupprimerEvaluationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupprimerEvaluationComponent]
    });
    fixture = TestBed.createComponent(SupprimerEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
