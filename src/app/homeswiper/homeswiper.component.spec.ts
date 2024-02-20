import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeswiperComponent } from './homeswiper.component';

describe('HomeswiperComponent', () => {
  let component: HomeswiperComponent;
  let fixture: ComponentFixture<HomeswiperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeswiperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeswiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
