import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmovieinfoComponent } from './viewmovieinfo.component';

describe('ViewmovieinfoComponent', () => {
  let component: ViewmovieinfoComponent;
  let fixture: ComponentFixture<ViewmovieinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewmovieinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewmovieinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
