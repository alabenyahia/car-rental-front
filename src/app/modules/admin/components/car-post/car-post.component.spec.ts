import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPostComponent } from './car-post.component';

describe('CarPostComponent', () => {
  let component: CarPostComponent;
  let fixture: ComponentFixture<CarPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
