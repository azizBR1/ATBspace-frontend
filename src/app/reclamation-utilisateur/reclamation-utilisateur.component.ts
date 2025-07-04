import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ReclamationUtilisateurService } from './reclamation-utilisateur.service';
import { Reclamation } from './Reclamation';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-reclamation-utilisateur',
  standalone: true,
  imports: [RouterLink, RouterOutlet,FormsModule,HttpClientModule],
  providers: [ReclamationUtilisateurService],
  templateUrl: './reclamation-utilisateur.component.html',
  styleUrl: './reclamation-utilisateur.component.css'
})
export class ReclamationUtilisateurComponent {
  isSidebarExpanded = false;
  selectedFile: File | null = null;
  reclamations: Reclamation[] = [];

  constructor(private reclamationService: ReclamationUtilisateurService,

  ) {}


  loadReclamationsByUser(): void {
    const username = localStorage.getItem('username');
    if (!username) {
      console.error('Aucun username');
      return;
    }
    this.reclamationService.getReclamationsByUserId(username).subscribe(
      (data: Reclamation[]) => {
        this.reclamations = data;
      },
      (error) => {
        console.error('Erreur:', error);
      }
    );
  }
        
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
        toggleButton.style.left = '290px';
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







  Reclamation: Reclamation = {
    id: 0,
    username: '',
    description: '',
    date: new Date(),
    statut: '',
    type: '',
    pieceJointe: null
  };


  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit(): void {
    const username = localStorage.getItem('username') || 'defaultUser';
    this.Reclamation.username = username;

    this.reclamationService.addReclamation(this.Reclamation.description,this.Reclamation.type, this.Reclamation.username, this.selectedFile || undefined)
      .subscribe(
        (response) => {
          console.log('Réclamation soumise avec succès :', response);
          alert('Réclamation soumise avec succès !');
          this.resetForm();
        },
        (error) => {
          console.error('Erreur lors de la soumission de la réclamation :', error);
          alert('Une erreur est survenue lors de la soumission de la réclamation.');
        }
      );
  }


  resetForm(): void {
    this.Reclamation = {
      id: 0,
      username: '',
      description: '',
      date: new Date(),
      statut: '',
      type: '',
      pieceJointe: null
    };
    this.selectedFile = null;
  }


  

}
