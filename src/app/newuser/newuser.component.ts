import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink, RouterOutlet} from '@angular/router';
import { Router } from '@angular/router';
import { UtilisateurService } from '../utilisateur/utilisateur.service';
import { Utilisateur } from '../utilisateur/utilisateur';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FileService } from '../file-utilisateur/file.service';


@Component({
  selector: 'app-newuser',
  standalone: true,
  imports: [RouterLink, RouterOutlet,FormsModule,CommonModule,HttpClientModule],
  providers: [UtilisateurService],
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {
  utilisateurs: Utilisateur[] = [];
  passworddure = 0;
  Majuscule = false;
  usernameexist = false;
  Chiffre = false;
  Carspec = false;
  Longueur = false;
  emailInvalid = false;
  emailExists = false;



  constructor(private utilisateurService: UtilisateurService,
              private fileService: FileService,
  ){}



  ngOnInit(): void{

    
  }

  usernameconfirm(value: string) {
    this.utilisateurService.checkUsernameExists(value).subscribe(exists => {
      this.usernameexist = exists;
    });
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

            const question1 = (document.getElementById('question1') as HTMLSelectElement).value;
            const reponse1 = (document.getElementById('reponse1') as HTMLInputElement).value.toUpperCase();

            const question2 = (document.getElementById('question2') as HTMLSelectElement).value;
            const reponse2 = (document.getElementById('reponse2') as HTMLInputElement).value.toUpperCase();

            const question3 = (document.getElementById('question3') as HTMLSelectElement).value;
            const reponse3 = (document.getElementById('reponse3') as HTMLInputElement).value.toUpperCase();

            
            const result = question1 + reponse1 + question2 + reponse2 + question3 + reponse3;
            const username = (document.getElementById('username') as HTMLSelectElement).value;

            if (username !== null) {
                this.fileService.addQuestionSecu(username, result).subscribe(
                (response: Utilisateur) => {
                      console.log('Question de sécurité enregistrée pour', response.username);
    
            },
          (error: HttpErrorResponse) => {
          console.error('Erreur lors de l’ajout de la question de sécurité :', error);

            }
          );
          } else {
              alert("Aucun utilisateur trouvé dans le localStorage.");
          }



            
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



mdpconfirm(value: string) {

  let dure = 0;

  const majuscule = /[A-Z]/;
  const chiffre = /[0-9]/;
  const carspec = /[^a-zA-Z0-9]/;
  
  if (value.match(majuscule)) {
    this.Majuscule = true;
      dure++;
  } 
  if (value.match(chiffre)) { 
    this.Chiffre = true;
      dure++;
  }
  if (value.match(carspec)) {
    this.Carspec = true;
      dure++;
  }
  if (value.length >= 10) {
    this.Longueur = true;
      dure++;
  }
  this.passworddure = dure;

}

addQuestionSecu(): void {
 

  
  
}




validEmail(email: string): void {
const exmpl = /^[a-zA-Z0-9](\.?[a-zA-Z0-9_-])*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;
    this.emailInvalid = !exmpl.test(email.trim());

    if (!this.emailInvalid) {

      this.utilisateurService.checkEmailExists(email).subscribe(exists => {
        this.emailExists = exists;
      });
    } else {

      this.emailExists = false;
    }

}


}
