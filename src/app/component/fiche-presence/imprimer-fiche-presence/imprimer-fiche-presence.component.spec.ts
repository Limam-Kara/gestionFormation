import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimerFichePresenceComponent } from './imprimer-fiche-presence.component';

describe('ImprimerFichePresenceComponent', () => {
  let component: ImprimerFichePresenceComponent;
  let fixture: ComponentFixture<ImprimerFichePresenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImprimerFichePresenceComponent]
    });
    fixture = TestBed.createComponent(ImprimerFichePresenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
