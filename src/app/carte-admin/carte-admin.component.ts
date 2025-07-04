import { Component } from '@angular/core';
import { Carte } from '../carte-utilisateur/Carte';
import { HttpErrorResponse } from '@angular/common/http';
import { CarteService } from '../carte-utilisateur/carte.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carte-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carte-admin.component.html',
  styleUrl: './carte-admin.component.css'
})
export class CarteAdminComponent {
  isSidebarExpanded = false;
  dmds: Carte[] =[];
  modifstatu: boolean = false;



  ngOnInit(): void {
    this.loaddemandes();
  }

     constructor(private carteservice: CarteService) {}

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

  
 saveReferrer() {
  sessionStorage.setItem('from', 'true');
}

public loaddemandes():void{

    this.carteservice.getAllCarte().subscribe(
      (data: Carte[]) => {
        if (data.length > 0) {
          this.dmds = data;
        }
      },
      (error: HttpErrorResponse) => {
        alert("Erreur lors de la récupération des demandes de carte par username");
      }
    );
  }
Carte: Carte = {
  id: 0,
  code: 0,
  type: '',
  statut: '',
  date: new Date().toISOString(),
  utilisateur: {
    id: 0,
    nom: '',
    prenom: '',
    email: '',
    username:'', mdp:'', telephone:'',role:'', status:''
  }
};

public setCarteToEdit(dmd: Carte): void {
  this.Carte = { ...dmd };
  this.modifstatu = !this.modifstatu;
}

public setCarteTodelete(dmd: Carte): void {
  this.Carte = { ...dmd };
  this.carteservice.deletedemande(this.Carte.id).subscribe(
(response) => {
          alert('Demande  Supprimer succès !');
          this.loaddemandes();
      },
      (error: HttpErrorResponse) => {
        alert("Erreur lors de la suppression de la demande");
      }
    );
  }


  public updatedemande():void{

    this.carteservice.updateCarte(this.Carte).subscribe(
      (response) => {
          alert('Demande  mis à jour avec succès !');
          this.loaddemandes();
      },
      (error: HttpErrorResponse) => {
        alert("Erreur lors de la modification de la demande");
      }
    );
  }

}
