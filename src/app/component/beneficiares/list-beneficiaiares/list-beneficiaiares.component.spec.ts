import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBeneficiaiaresComponent } from './list-beneficiaiares.component';

describe('ListBeneficiaiaresComponent', () => {
  let component: ListBeneficiaiaresComponent;
  let fixture: ComponentFixture<ListBeneficiaiaresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBeneficiaiaresComponent]
    });
    fixture = TestBed.createComponent(ListBeneficiaiaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
