import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsernameoublieUtilisateurComponent } from './usernameoublie-utilisateur.component';

describe('UsernameoublieUtilisateurComponent', () => {
  let component: UsernameoublieUtilisateurComponent;
  let fixture: ComponentFixture<UsernameoublieUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsernameoublieUtilisateurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsernameoublieUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
