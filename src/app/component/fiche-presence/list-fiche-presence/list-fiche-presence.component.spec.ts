import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFichePresenceComponent } from './list-fiche-presence.component';

describe('ListFichePresenceComponent', () => {
  let component: ListFichePresenceComponent;
  let fixture: ComponentFixture<ListFichePresenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListFichePresenceComponent]
    });
    fixture = TestBed.createComponent(ListFichePresenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
