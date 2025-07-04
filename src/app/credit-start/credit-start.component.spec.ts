import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditStartComponent } from './credit-start.component';

describe('CreditStartComponent', () => {
  let component: CreditStartComponent;
  let fixture: ComponentFixture<CreditStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditStartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
