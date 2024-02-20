import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminaddpromotionComponent } from './adminaddpromotion.component';

describe('AdminaddpromotionComponent', () => {
  let component: AdminaddpromotionComponent;
  let fixture: ComponentFixture<AdminaddpromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminaddpromotionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminaddpromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
