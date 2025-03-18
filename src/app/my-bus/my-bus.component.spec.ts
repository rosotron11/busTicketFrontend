import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBusComponent } from './my-bus.component';

describe('MyBusComponent', () => {
  let component: MyBusComponent;
  let fixture: ComponentFixture<MyBusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyBusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
