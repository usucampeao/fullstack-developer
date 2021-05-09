import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProdItemComponent } from './user-prod-item.component';

describe('UserProdItemComponent', () => {
  let component: UserProdItemComponent;
  let fixture: ComponentFixture<UserProdItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProdItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProdItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
