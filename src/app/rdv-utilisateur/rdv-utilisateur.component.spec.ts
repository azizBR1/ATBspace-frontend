import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvUtilisateurComponent } from './rdv-utilisateur.component';

describe('RdvUtilisateurComponent', () => {
  let component: RdvUtilisateurComponent;
  let fixture: ComponentFixture<RdvUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RdvUtilisateurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RdvUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
