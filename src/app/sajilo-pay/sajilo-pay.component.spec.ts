import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SajiloPayComponent } from './sajilo-pay.component';

describe('SajiloPayComponent', () => {
  let component: SajiloPayComponent;
  let fixture: ComponentFixture<SajiloPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SajiloPayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SajiloPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
