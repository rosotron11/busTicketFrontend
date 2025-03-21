import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusPassengersComponent } from './bus-passengers.component';

describe('BusPassengersComponent', () => {
  let component: BusPassengersComponent;
  let fixture: ComponentFixture<BusPassengersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusPassengersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusPassengersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
