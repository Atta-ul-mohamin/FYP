import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProffesionComponent } from './update-proffesion.component';

describe('UpdateProffesionComponent', () => {
  let component: UpdateProffesionComponent;
  let fixture: ComponentFixture<UpdateProffesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProffesionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProffesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
