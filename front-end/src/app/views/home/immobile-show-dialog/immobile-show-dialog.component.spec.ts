import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmobileShowDialogComponent } from './immobile-show-dialog.component';

describe('ImmobileShowDialogComponent', () => {
  let component: ImmobileShowDialogComponent;
  let fixture: ComponentFixture<ImmobileShowDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImmobileShowDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmobileShowDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
