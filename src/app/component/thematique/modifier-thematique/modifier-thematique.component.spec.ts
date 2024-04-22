import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierThematiqueComponent } from './modifier-thematique.component';

describe('ModifierThematiqueComponent', () => {
  let component: ModifierThematiqueComponent;
  let fixture: ComponentFixture<ModifierThematiqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifierThematiqueComponent]
    });
    fixture = TestBed.createComponent(ModifierThematiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
