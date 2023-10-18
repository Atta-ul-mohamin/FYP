import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GigManageComponent } from './gig-manage.component';

describe('GigManageComponent', () => {
  let component: GigManageComponent;
  let fixture: ComponentFixture<GigManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GigManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GigManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
