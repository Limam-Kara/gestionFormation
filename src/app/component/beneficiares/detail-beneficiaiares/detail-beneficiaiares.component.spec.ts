import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBeneficiaiaresComponent } from './detail-beneficiaiares.component';

describe('DetailBeneficiaiaresComponent', () => {
  let component: DetailBeneficiaiaresComponent;
  let fixture: ComponentFixture<DetailBeneficiaiaresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailBeneficiaiaresComponent]
    });
    fixture = TestBed.createComponent(DetailBeneficiaiaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
