import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditMounassibComponent } from './credit-mounassib.component';

describe('CreditMounassibComponent', () => {
  let component: CreditMounassibComponent;
  let fixture: ComponentFixture<CreditMounassibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditMounassibComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditMounassibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
