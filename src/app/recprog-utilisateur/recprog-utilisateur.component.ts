import { Component, OnInit } from '@angular/core';

import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReclamationUtilisateurService } from '../reclamation-utilisateur/reclamation-utilisateur.service';
import { Reclamation } from '../reclamation-utilisateur/Reclamation';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recprog-utilisateur',
  standalone: true,
  imports: [RouterLink, RouterOutlet,FormsModule,HttpClientModule,CommonModule],
  providers: [ReclamationUtilisateurService],
  templateUrl: './recprog-utilisateur.component.html',
  styleUrl: './recprog-utilisateur.component.css'
})
export class RecprogUtilisateurComponent implements OnInit {
    isSidebarExpanded = false;
    selectedFile: File | null = null;
    Reclamations: Reclamation[] = [];
    currentStep = 1;
    progressWidth = '0%';
  
    constructor(private reclamationService: ReclamationUtilisateurService,
  
    ) {}
  
    ngOnInit(): void {
      this.loadReclamationsByUser();
      
    }
    
    loadReclamationsByUser(): void {
      const username = localStorage.getItem('username');
      if (!username) {
        console.error('Aucun username');
        return;
      }
      this.reclamationService.getReclamationsByUserId(username).subscribe(
        (data: Reclamation[]) => {
          this.Reclamations = data;
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
  
  
  
  
  


}
