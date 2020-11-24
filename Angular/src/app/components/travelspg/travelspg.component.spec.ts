import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelspgComponent } from './travelspg.component';

describe('TravelspgComponent', () => {
  let component: TravelspgComponent;
  let fixture: ComponentFixture<TravelspgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelspgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelspgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
