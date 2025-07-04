import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecprogUtilisateurComponent } from './recprog-utilisateur.component';

describe('RecprogUtilisateurComponent', () => {
  let component: RecprogUtilisateurComponent;
  let fixture: ComponentFixture<RecprogUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecprogUtilisateurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecprogUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
