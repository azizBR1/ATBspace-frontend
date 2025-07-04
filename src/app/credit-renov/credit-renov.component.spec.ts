import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditRenovComponent } from './credit-renov.component';

describe('CreditRenovComponent', () => {
  let component: CreditRenovComponent;
  let fixture: ComponentFixture<CreditRenovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditRenovComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditRenovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
