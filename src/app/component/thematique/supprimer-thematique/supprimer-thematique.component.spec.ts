import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerThematiqueComponent } from './supprimer-thematique.component';

describe('SupprimerThematiqueComponent', () => {
  let component: SupprimerThematiqueComponent;
  let fixture: ComponentFixture<SupprimerThematiqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupprimerThematiqueComponent]
    });
    fixture = TestBed.createComponent(SupprimerThematiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
