import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierBeneficiaiaresComponent } from './modifier-beneficiaiares.component';

describe('ModifierBeneficiaiaresComponent', () => {
  let component: ModifierBeneficiaiaresComponent;
  let fixture: ComponentFixture<ModifierBeneficiaiaresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifierBeneficiaiaresComponent]
    });
    fixture = TestBed.createComponent(ModifierBeneficiaiaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
