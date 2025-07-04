import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUtilisateurComponent } from './file-utilisateur.component';

describe('FileUtilisateurComponent', () => {
  let component: FileUtilisateurComponent;
  let fixture: ComponentFixture<FileUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileUtilisateurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FileUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
