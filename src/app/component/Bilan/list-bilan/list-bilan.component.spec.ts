import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBilanComponent } from './list-bilan.component';

describe('ListBilanComponent', () => {
  let component: ListBilanComponent;
  let fixture: ComponentFixture<ListBilanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBilanComponent]
    });
    fixture = TestBed.createComponent(ListBilanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
