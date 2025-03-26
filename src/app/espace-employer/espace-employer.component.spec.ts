import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceEmployerComponent } from './espace-employer.component';

describe('EspaceEmployerComponent', () => {
  let component: EspaceEmployerComponent;
  let fixture: ComponentFixture<EspaceEmployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspaceEmployerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EspaceEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
