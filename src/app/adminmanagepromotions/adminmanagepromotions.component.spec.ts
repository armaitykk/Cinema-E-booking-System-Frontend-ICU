import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminmanagepromotionsComponent } from './adminmanagepromotions.component';

describe('AdminmanagepromotionsComponent', () => {
  let component: AdminmanagepromotionsComponent;
  let fixture: ComponentFixture<AdminmanagepromotionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminmanagepromotionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminmanagepromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
