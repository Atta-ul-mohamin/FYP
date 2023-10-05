import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GigInfoUploadComponent } from './gig-info-upload.component';

describe('GigInfoUploadComponent', () => {
  let component: GigInfoUploadComponent;
  let fixture: ComponentFixture<GigInfoUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GigInfoUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GigInfoUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
