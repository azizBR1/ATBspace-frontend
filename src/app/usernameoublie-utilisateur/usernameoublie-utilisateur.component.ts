import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileService } from '../file-utilisateur/file.service';
import { UtilisateurService } from '../utilisateur/utilisateur.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usernameoublie-utilisateur',
  standalone: true,
  imports: [HttpClientModule,CommonModule, FormsModule],
  templateUrl: './usernameoublie-utilisateur.component.html',
  styleUrl: './usernameoublie-utilisateur.component.css'
})
export class UsernameoublieUtilisateurComponent implements OnInit {
  questionLabel1: string = '';
  questionLabel2: string = '';
  questionLabel3: string = '';
  public question1: string = '';
  public question2: string = '';
  public question3: string = '';
  public reponse1: string = '';
  public reponse2: string = '';
  public reponse3: string = '';
  public isQuestionModalOpen = false;
  username: string = '';


  constructor(private utilisateurService: UtilisateurService,
                  private fileService: FileService,private route: ActivatedRoute
     ) {}
  
  ngOnInit(): void {
    localStorage.clear();
    this.route.queryParams.subscribe(params => {
      const username = params['username'];
      if (username) {
        localStorage.setItem('username', username);
        this.username = username; 
      }
    });
    this.loadQuestions();
  }

    openQuestionModal() {
  this.isQuestionModalOpen = true;
}

closeQuestionModal() {
  this.isQuestionModalOpen = false;
}

submitQuestions() {
  const reponsean= this.question1+this.reponse1.toUpperCase()+this.question2+this.reponse2.toUpperCase()+this.question3+this.reponse3.toUpperCase();
  const reponse = this.normalizeString(reponsean);


   if (!confirm('Confirmez-vous vos réponses aux questions de sécurité ?')) {
    return;
  }
  if (this.username!== null) {
        this.fileService.verifQuestionSecu(this.username).subscribe(
        (response) => {
          if(response===reponse){
          console.log('Réponses de sécurité verfaaaaaaaaa');
          alert('Voici votre username : ' + this.username);
          this.closeQuestionModal();
          }
          else{
            alert('Réponses de sécurité incorrectes');
          }
        },
        (error) => {
          console.error('Question secu:', error);

        }
      );
    } else {
      console.error('Aucun nom d\'utilisateur trouvé dans le localStorage');

    }

  
}

normalizeString(str: string): string {
  return str
    .normalize("NFD")                   
    .replace(/[\u0300-\u036f]/g, "")   
    .replace(/\s+/g, "")               
    .toUpperCase();                    
}



  loadQuestions() {
  const username = localStorage.getItem('username');
  if (username!== null) {
        this.fileService.verifQuestionSecu(username).subscribe(
        (response) => {
          const questionMap: { [key: string]: string } = {
          Q11: "Quel est le nom de votre mère ?",
          Q12: "Dans quelle ville êtes-vous né ?",
          Q13: "Quel est le nom de votre animal préféré ? (chien ou chat)",
          Q21: "Quel est votre film préféré ?",
          Q22: "Quel est le nom de votre meilleur ami d'enfance ?",
          Q23: "Quelle est votre voiture de rêve ?",
          Q31: "Quel métier rêviez-vous de faire enfant ?",
          Q32: "Quel est le nom de votre enseignant préféré ?",
          Q33: "Avez-vous un chien ou un chat ? Si oui, quel est son nom ?"
        };
        const codes = response.match(/Q\d{2}/g);
        if (codes && codes.length >= 3) {
          this.questionLabel1 = questionMap[codes[0]] || '';
          this.questionLabel2 = questionMap[codes[1]] || '';
          this.questionLabel3 = questionMap[codes[2]] || '';
        }
        if (codes && codes.length >= 3) {
          this.question1 = codes[0];
          this.question2 = codes[1];
          this.question3 = codes[2];
  }

          console.log('Réponses de sécurité loaded');
        },
        (error) => {
          console.error('Question secu:', error);

        }
      );
    } else {
      console.error('Aucun nom d\'utilisateur trouvé dans le localStorage');

    }
}
}
