import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceUtilisateurComponent } from './espace-utilisateur.component';

describe('EspaceUtilisateurComponent', () => {
  let component: EspaceUtilisateurComponent;
  let fixture: ComponentFixture<EspaceUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspaceUtilisateurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EspaceUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
