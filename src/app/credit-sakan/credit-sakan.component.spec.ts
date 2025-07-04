import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditSakanComponent } from './credit-sakan.component';

describe('CreditSakanComponent', () => {
  let component: CreditSakanComponent;
  let fixture: ComponentFixture<CreditSakanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditSakanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditSakanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
