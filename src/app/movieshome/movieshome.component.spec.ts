import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieshomeComponent } from './movieshome.component';

describe('MovieshomeComponent', () => {
  let component: MovieshomeComponent;
  let fixture: ComponentFixture<MovieshomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieshomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieshomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
