import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteEmployerComponent } from './carte-employer.component';

describe('CarteEmployerComponent', () => {
  let component: CarteEmployerComponent;
  let fixture: ComponentFixture<CarteEmployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarteEmployerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarteEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
