import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerBeneficiaiaresComponent } from './supprimer-beneficiaiares.component';

describe('SupprimerBeneficiaiaresComponent', () => {
  let component: SupprimerBeneficiaiaresComponent;
  let fixture: ComponentFixture<SupprimerBeneficiaiaresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupprimerBeneficiaiaresComponent]
    });
    fixture = TestBed.createComponent(SupprimerBeneficiaiaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
