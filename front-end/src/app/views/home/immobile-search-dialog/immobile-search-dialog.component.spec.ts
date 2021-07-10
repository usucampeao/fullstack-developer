import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmobileSearchDialogComponent } from './immobile-search-dialog.component';

describe('ImmobileSearchDialogComponent', () => {
  let component: ImmobileSearchDialogComponent;
  let fixture: ComponentFixture<ImmobileSearchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImmobileSearchDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmobileSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
