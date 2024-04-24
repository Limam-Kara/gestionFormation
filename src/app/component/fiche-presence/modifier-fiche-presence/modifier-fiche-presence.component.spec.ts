import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierFichePresenceComponent } from './modifier-fiche-presence.component';

describe('ModifierFichePresenceComponent', () => {
  let component: ModifierFichePresenceComponent;
  let fixture: ComponentFixture<ModifierFichePresenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifierFichePresenceComponent]
    });
    fixture = TestBed.createComponent(ModifierFichePresenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
