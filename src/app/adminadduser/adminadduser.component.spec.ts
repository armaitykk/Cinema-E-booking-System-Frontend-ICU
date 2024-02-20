import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminadduserComponent } from './adminadduser.component';

describe('AdminadduserComponent', () => {
  let component: AdminadduserComponent;
  let fixture: ComponentFixture<AdminadduserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminadduserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminadduserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
