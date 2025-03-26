import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationUtilisateurComponent } from './reclamation-utilisateur.component';

describe('ReclamationUtilisateurComponent', () => {
  let component: ReclamationUtilisateurComponent;
  let fixture: ComponentFixture<ReclamationUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReclamationUtilisateurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReclamationUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
