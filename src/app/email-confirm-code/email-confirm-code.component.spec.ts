import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailConfirmCodeComponent } from './email-confirm-code.component';

describe('EmailConfirmCodeComponent', () => {
  let component: EmailConfirmCodeComponent;
  let fixture: ComponentFixture<EmailConfirmCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailConfirmCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailConfirmCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
