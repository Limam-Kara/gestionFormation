import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListbenificiareEvaluationComponent } from './listbenificiare-evaluation.component';

describe('ListbenificiareEvaluationComponent', () => {
  let component: ListbenificiareEvaluationComponent;
  let fixture: ComponentFixture<ListbenificiareEvaluationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListbenificiareEvaluationComponent]
    });
    fixture = TestBed.createComponent(ListbenificiareEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
