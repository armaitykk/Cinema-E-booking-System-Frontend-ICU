import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcominglistComponent } from './upcominglist.component';

describe('UpcominglistComponent', () => {
  let component: UpcominglistComponent;
  let fixture: ComponentFixture<UpcominglistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcominglistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcominglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
