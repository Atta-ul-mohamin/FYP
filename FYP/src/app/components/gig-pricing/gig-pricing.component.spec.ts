import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GigPricingComponent } from './gig-pricing.component';

describe('GigPricingComponent', () => {
  let component: GigPricingComponent;
  let fixture: ComponentFixture<GigPricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GigPricingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GigPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
