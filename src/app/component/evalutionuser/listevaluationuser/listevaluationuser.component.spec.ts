import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListevaluationuserComponent } from './listevaluationuser.component';

describe('ListevaluationuserComponent', () => {
  let component: ListevaluationuserComponent;
  let fixture: ComponentFixture<ListevaluationuserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListevaluationuserComponent]
    });
    fixture = TestBed.createComponent(ListevaluationuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
