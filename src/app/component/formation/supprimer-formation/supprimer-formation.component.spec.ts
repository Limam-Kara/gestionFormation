import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerFormationComponent } from './supprimer-formation.component';

describe('SupprimerFormationComponent', () => {
  let component: SupprimerFormationComponent;
  let fixture: ComponentFixture<SupprimerFormationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupprimerFormationComponent]
    });
    fixture = TestBed.createComponent(SupprimerFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
