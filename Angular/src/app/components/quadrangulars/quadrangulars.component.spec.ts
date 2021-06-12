import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadrangularsComponent } from './quadrangulars.component';

describe('QuadrangularsComponent', () => {
  let component: QuadrangularsComponent;
  let fixture: ComponentFixture<QuadrangularsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuadrangularsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuadrangularsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
