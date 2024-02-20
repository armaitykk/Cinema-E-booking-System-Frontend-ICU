import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NowshowinglistComponent } from './nowshowinglist.component';

describe('NowshowinglistComponent', () => {
  let component: NowshowinglistComponent;
  let fixture: ComponentFixture<NowshowinglistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NowshowinglistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NowshowinglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
