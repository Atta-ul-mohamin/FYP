import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeassageManageComponent } from './meassage-manage.component';

describe('MeassageManageComponent', () => {
  let component: MeassageManageComponent;
  let fixture: ComponentFixture<MeassageManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeassageManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeassageManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
