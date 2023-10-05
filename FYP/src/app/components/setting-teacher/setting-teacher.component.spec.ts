import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingTeacherComponent } from './setting-teacher.component';

describe('SettingTeacherComponent', () => {
  let component: SettingTeacherComponent;
  let fixture: ComponentFixture<SettingTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingTeacherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
