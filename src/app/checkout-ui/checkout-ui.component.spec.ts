import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutUiComponent } from './checkout-ui.component';

describe('CheckoutUiComponent', () => {
  let component: CheckoutUiComponent;
  let fixture: ComponentFixture<CheckoutUiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckoutUiComponent]
    });
    fixture = TestBed.createComponent(CheckoutUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
