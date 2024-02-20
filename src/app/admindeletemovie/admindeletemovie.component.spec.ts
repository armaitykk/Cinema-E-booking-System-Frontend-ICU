import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindeletemovieComponent } from './admindeletemovie.component';

describe('AdmindeletemovieComponent', () => {
  let component: AdmindeletemovieComponent;
  let fixture: ComponentFixture<AdmindeletemovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmindeletemovieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmindeletemovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
