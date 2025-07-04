import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditBienetreComponent } from './credit-bienetre.component';

describe('CreditBienetreComponent', () => {
  let component: CreditBienetreComponent;
  let fixture: ComponentFixture<CreditBienetreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditBienetreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditBienetreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
