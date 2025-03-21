import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusRegistrationComponent } from './bus-registration.component';

describe('BusRegistrationComponent', () => {
  let component: BusRegistrationComponent;
  let fixture: ComponentFixture<BusRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
