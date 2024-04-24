import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBeneficiaiaresComponent } from './create-beneficiaiares.component';

describe('CreateBeneficiaiaresComponent', () => {
  let component: CreateBeneficiaiaresComponent;
  let fixture: ComponentFixture<CreateBeneficiaiaresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBeneficiaiaresComponent]
    });
    fixture = TestBed.createComponent(CreateBeneficiaiaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
