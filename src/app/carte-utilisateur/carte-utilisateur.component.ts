import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarteService } from './carte.service';
import { Carte } from './Carte';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carte-utilisateur',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carte-utilisateur.component.html',
  styleUrl: './carte-utilisateur.component.css'
})
export class CarteUtilisateurComponent implements OnInit {


  isSidebarExpanded = false;
  visibleDetail: number | null = null;
  dmds: Carte| null = null;
  showCursor = true;
  cursor = false;
  username: string = '';
  Type: string = '';
  statut: string = '';
  selecType: string | null = null;
  divConfirmation = false;
  histodmd = false;
  visiblehisto=false;

Confirmation(type: string) {
  this.selecType = type;
  this.divConfirmation = true;
}

confirmDemande() {
  if (this.selecType) {
    this.onAdddemande(this.selecType);
    this.divConfirmation = false;
    this.selecType = null;
  }
}

cancelDemande() {
  this.divConfirmation = false;
  this.selecType = null;
}


   constructor(private carteservice: CarteService) {}
  ngOnInit() {

    this.checkdemandencours();
    setTimeout(() => this.showCursor = false, 3500);


    setTimeout(() => this.cursor = true, 700);

    setTimeout(() => this.cursor = false, 3500);

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

affichedetail(nb: number){
this.visibleDetail  = this.visibleDetail  === nb ? null : nb;
}
closeDetails() {
  this.visibleDetail = null;
}


 public onAdddemande(type: string): void{
    this.username = localStorage.getItem('username') || '';
    this.statut = 'En attente';
    this.Type = type;
    this.carteservice.adddemande(this.username,this.Type, this.statut).subscribe(
      (response: Carte) =>{
        alert("Votre demande de carte a été envoyée avec succès.");
        window.location.reload();

      },
      (error: HttpErrorResponse) =>{
        alert("Vous avez déja demander une carte");
      }
    );
  }

  public checkdemandencours():void{
    this.username = localStorage.getItem('username') || '';
    this.carteservice.getCartesByUsername(this.username).subscribe(
      (data: Carte[]) => {
        if (data.length > 0) {
          this.dmds = data[0];
          this.histodmd = true;
        } else {
          this.histodmd = false;
        }
      },
      (error: HttpErrorResponse) => {
        alert("Erreur lors de la récupération des demandes de carte par username");
      }
    );
  }
public divhistodmd():void{
  this.visiblehisto=!this.visiblehisto;
}


}
