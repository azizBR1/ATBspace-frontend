import { Component } from '@angular/core';
import { FileService } from '../file-utilisateur/file.service';
import { Position } from '../file-utilisateur/file';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-file-employer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './file-employer.component.html',
  styleUrl: './file-employer.component.css'
})
export class FileEmployerComponent {
isSidebarExpanded = false;
 positions: Position[] =[];
  dureeTotaleDernierePosition: number | undefined;



constructor(private Fileservice: FileService) { }


        
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
  loadFiles(): void {
    this.Fileservice.getPositons().subscribe(
      (data: Position[]) => {
        console.log("Positions récupérées :", data);
        this.positions = data;
        const derniere = data[data.length - 1];
        this.dureeTotaleDernierePosition = derniere.dureetotal;
      },
      (error) => {
        console.error('Erreur Positions:', error);
      }
    );  
  }

  possuivant(){
    this.Fileservice.Deletepositon().subscribe(
      () => {
        console.log("Suppression réussie !");
        this.loadFiles(); 
      },
      (error) => {
        console.error("Erreur lors de la suppression :", error);
      }
    );
  }

}
