import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierAffectationComponent } from './modifier-affectation.component';

describe('ModifierAffectationComponent', () => {
  let component: ModifierAffectationComponent;
  let fixture: ComponentFixture<ModifierAffectationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifierAffectationComponent]
    });
    fixture = TestBed.createComponent(ModifierAffectationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
