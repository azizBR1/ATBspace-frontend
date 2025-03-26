import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../utilisateur/utilisateur.service';
import { Utilisateur } from '../utilisateur/utilisateur';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-gest-utilisateurs',
  standalone: true,
  providers: [UtilisateurService,HttpClientModule],
  imports: [HttpClientModule,CommonModule, FormsModule],
  templateUrl: './gest-utilisateurs.component.html',
  styleUrl: './gest-utilisateurs.component.css'
  
})

export class GestUtilisateursComponent implements OnInit {
  public utilisateurs: Utilisateur[] = [];
  public editUtilisateur: Utilisateur ={id:0, username:'', nom:'', prenom:'', mdp:'', email:'', telephone:'', status:'', role:''};
  public deleteUtilisateur: Utilisateur ={id:0, username:'', nom:'', prenom:'', mdp:'', email:'', telephone:'', status:'', role:''};
  isSidebarExpanded = false;
  
  toggleSidebar() {
    this.isSidebarExpanded = !this.isSidebarExpanded;
    
    const sidebar = document.getElementById('mySidebar');
    const body = document.body;
    const toggleButton = document.getElementById('mobileSidebarToggle');
    const buttonIcon = toggleButton?.querySelector('i');
    
    if (this.isSidebarExpanded) {
      sidebar?.classList.add('expanded');
      body.classList.add('sidebar-expanded');
      if (toggleButton) {
        toggleButton.style.left = '270px';
      }
      if (buttonIcon) {
        buttonIcon.className = 'bi bi-arrow-bar-left';
      } 
    } else {
      sidebar?.classList.remove('expanded');
      body.classList.remove('sidebar-expanded');
      if (toggleButton) {
        toggleButton.style.left = '10px';
      }
      if (buttonIcon) {
        buttonIcon.className = 'bi bi-arrow-bar-right';
      }
    }
  }
  


  constructor(private utilisateurService: UtilisateurService) {}

  ngOnInit(): void {
    this.loadUtilisateur();
  }


  
  public getUtilisateur(): void {
    this.utilisateurService.getUtilisateur().subscribe(
      (data: Utilisateur[]) => {
        this.utilisateurs = data.filter(utilisateur => utilisateur.role === 'CLIENT' || utilisateur.role === 'EMPLOYEE');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddUtilisateur(addForm: NgForm): void{
    document.getElementById('add-utilisateur-form')?.click();
    this.utilisateurService.addUtilisateur(addForm.value).subscribe(
      (response: Utilisateur) =>{
        this.getUtilisateur();
        addForm.reset();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }

  public onUpdateUtilisateur(utilisateur: Utilisateur): void{
    this.utilisateurService.updateUtilisateur(utilisateur).subscribe(
      (response: Utilisateur) =>{
        this.getUtilisateur();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }

  public onDeleteUtilisateur(utilisateurId: number): void{
    this.utilisateurService.deleteUtilisateur(utilisateurId).subscribe(
      (response: void) =>{
        this.getUtilisateur();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }

  public onOpenModal(utilisateur: Utilisateur, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'edit'){
      this.editUtilisateur = utilisateur;
      button.setAttribute('data-target', '#updateUtilisateurModal');
    }
    if(mode === 'delete'){
      this.deleteUtilisateur = utilisateur;
      button.setAttribute('data-target', '#deleteUtilisateurModal');
    }
    container?.appendChild(button);
    button.click();
  }

public onOpenModaladd(mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add'){
      button.setAttribute('data-target', '#addUtilisateurModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public searchUtilisateurs(key: string): void{
    const results: Utilisateur[] = [];
    for(const utilisateur of this.utilisateurs){
      if(utilisateur.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || utilisateur.prenom.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || utilisateur.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || utilisateur.username.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || utilisateur.role.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || utilisateur.status.toLowerCase().indexOf(key.toLowerCase()) !== -1)

      {
        results.push(utilisateur);
      }
    }
    this.utilisateurs = results;
    if(results.length === 0 || !key){
      this.loadUtilisateur();
    }
  }

  loadUtilisateur(): void{
    this.utilisateurService.getUtilisateur().subscribe(data => {
      this.utilisateurs = data.filter(utilisateur => utilisateur.role === 'CLIENT' || utilisateur.role === 'EMPLOYEE');
    });
  }



public selectedUtilisateur: Utilisateur | null = null;

public onShowDetails(utilisateur: Utilisateur): void {
  this.selectedUtilisateur = utilisateur;
}


}

