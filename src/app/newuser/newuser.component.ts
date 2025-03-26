import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink, RouterOutlet} from '@angular/router';
import { Router } from '@angular/router';
import { UtilisateurService } from '../utilisateur/utilisateur.service';
import { Utilisateur } from '../utilisateur/utilisateur';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-newuser',
  standalone: true,
  imports: [RouterLink, RouterOutlet,FormsModule,HttpClientModule],
  providers: [UtilisateurService],
  templateUrl: './newuser.component.html',
  styleUrl: './newuser.component.css'
})
export class NewuserComponent implements OnInit {
  utilisateurs: Utilisateur[] = [];
  constructor(private utilisateurService: UtilisateurService){}



  ngOnInit(): void{
    this.loadutilisateurs();
    
  }
  loadutilisateurs(): void {
    this.utilisateurService
      .getUtilisateur()
      .subscribe((utilisateurs) => (this.utilisateurs = utilisateurs));
  }


  public getUtilisateurs(): void {
  
    this.utilisateurService.getUtilisateur().subscribe(
      (response: Utilisateur[])=>{
        this.utilisateurs = response;
      }
    );
}


public onAddUtilisateur(addForm: NgForm): void{
        document.getElementById('add-utilisateur-form')?.click();
        this.utilisateurService.addUtilisateur(addForm.value).subscribe(
          (response: Utilisateur) =>{
            this.getUtilisateurs();
            addForm.reset();
            alert("Madame, Monsieur, "+response.prenom +' Votre demande sera traitée dans les deux jours ouvrables suivants aujourd hui.');
            setTimeout(() => {
              window.location.href = "http://localhost:4200/#/";
            }, 2000);
          },
          (error: HttpErrorResponse) =>{
            alert(error.message);
          }
        );
      }


}
