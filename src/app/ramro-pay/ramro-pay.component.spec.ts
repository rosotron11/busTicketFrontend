import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RamroPayComponent } from './ramro-pay.component';

describe('RamroPayComponent', () => {
  let component: RamroPayComponent;
  let fixture: ComponentFixture<RamroPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RamroPayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RamroPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
