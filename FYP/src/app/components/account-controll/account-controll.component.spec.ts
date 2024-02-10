import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountControllComponent } from './account-controll.component';

describe('AccountControllComponent', () => {
  let component: AccountControllComponent;
  let fixture: ComponentFixture<AccountControllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountControllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountControllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
