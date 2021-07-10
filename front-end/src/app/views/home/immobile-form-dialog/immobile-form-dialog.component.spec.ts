import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmobileFormDialogComponent } from './immobile-form-dialog.component';

describe('ImmobileFormDialogComponent', () => {
  let component: ImmobileFormDialogComponent;
  let fixture: ComponentFixture<ImmobileFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImmobileFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmobileFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
