import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditUtilisateurComponent } from './credit-utilisateur.component';

describe('CreditUtilisateurComponent', () => {
  let component: CreditUtilisateurComponent;
  let fixture: ComponentFixture<CreditUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditUtilisateurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
