import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyUtilisateurComponent } from './currency-utilisateur.component';

describe('CurrencyUtilisateurComponent', () => {
  let component: CurrencyUtilisateurComponent;
  let fixture: ComponentFixture<CurrencyUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyUtilisateurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrencyUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
