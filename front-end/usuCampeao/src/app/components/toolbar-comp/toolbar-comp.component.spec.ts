import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarCompComponent } from './toolbar-comp.component';

describe('ToolbarCompComponent', () => {
  let component: ToolbarCompComponent;
  let fixture: ComponentFixture<ToolbarCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarCompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
