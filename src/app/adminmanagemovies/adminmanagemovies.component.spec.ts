import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminmanagemoviesComponent } from './adminmanagemovies.component';

describe('AdminmanagemoviesComponent', () => {
  let component: AdminmanagemoviesComponent;
  let fixture: ComponentFixture<AdminmanagemoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminmanagemoviesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminmanagemoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
