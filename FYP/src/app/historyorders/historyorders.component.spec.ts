import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryordersComponent } from './historyorders.component';

describe('HistoryordersComponent', () => {
  let component: HistoryordersComponent;
  let fixture: ComponentFixture<HistoryordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryordersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoryordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
