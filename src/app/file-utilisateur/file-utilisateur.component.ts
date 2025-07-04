import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileService } from './file.service';
import { Position } from './file';

@Component({
  selector: 'app-file-utilisateur',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [FileService],
  templateUrl: './file-utilisateur.component.html',
  styleUrl: './file-utilisateur.component.css'
})
export class FileUtilisateurComponent implements OnInit {
  files: Position[] = [];
  laFile: Position | null = null;
  username: string = '';
  duree: number = 0;
  service: string = '';
  success: boolean = false;
  ticketexist: boolean = false;
  codeafficher: boolean = false;
  isSidebarExpanded = false;

  servicesValid = [
    'Versement_et_retrait',
    'Consultation_de_compte',
    'Relevé_de_compte',
    'Délivrance_de_chéquier',
    'Virement',
    'Autre'
  ];
  
  isServiceValid(): boolean {
    return this.servicesValid.includes(this.service);
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

  ngOnInit(): void {
    this.loadFiles();
  }

  toggleCodeAffichage(): void {
    this.codeafficher = !this.codeafficher;
  }
  

  loadFiles(): void {
    this.username = localStorage.getItem('username') || '';
    console.log("Username récupéré du localStorage:", this.username);
    this.fileService.getposition(this.username).subscribe(
      (data: Position) => {
        this.files = [data];
        this.laFile = data;
          this.ticketexist = true;
        
      },
      (error) => {
        console.error('Erreur lors du chargement des positions', error);
        this.ticketexist = false;
      }
    );
  }
  
  constructor(private fileService: FileService) {}

  Defduree(): void {
    switch (this.service) {
      case 'Versement_et_retrait':
        this.duree = 7;
        break;
      case 'Consultation_de_compte':
        this.duree = 8;
        break;
      case 'Relevé_de_compte':
        this.duree = 5;
        break;
      case 'Délivrance_de_chéquier':
        this.duree = 10;
        break;
      case 'Virement':
        this.duree = 5;
        break;
      case 'Autre':
        this.duree = 10;
        break;

    }
  }



  onSubmit(): void {
   
    this.username = localStorage.getItem('username') || '';
    this.fileService.addposition(this.username, this.duree, this.service).subscribe({
      next: () => {this.success = true,
        this.loadFiles();

      },
      
      error: err => {
        this.success = false;
        console.error('Error:', err);
        this.loadFiles();
      }
    });
  }
}
