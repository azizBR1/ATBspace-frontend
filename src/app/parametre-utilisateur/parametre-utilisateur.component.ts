import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../utilisateur/utilisateur.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Utilisateur } from '../utilisateur/utilisateur';
import { FileService } from '../file-utilisateur/file.service';

@Component({
  selector: 'app-parametre-utilisateur',
  standalone: true,
  providers: [UtilisateurService,HttpClientModule],
  imports: [HttpClientModule,CommonModule, FormsModule],
  templateUrl: './parametre-utilisateur.component.html',
  styleUrl: './parametre-utilisateur.component.css'
})
export class ParametreUtilisateurComponent implements OnInit {
public utilisateurusername: Utilisateur ={id:0, username:'', nom:'', prenom:'', mdp:'', email:'', telephone:'', status:'', role:''};
  isSidebarExpanded = false;
  public totp: string | null = null;
  public isModalOpen = false;
  public currentField: string = '';
  public updatedValue: string = '';
  public isQuestionModalOpen = false;
  public question1: string = '';
  public question2: string = '';
  public question3: string = '';
  public reponse1: string = '';
  public reponse2: string = '';
  public reponse3: string = '';
  public Bquestionreponse: String = '';
  questionLabel1: string = '';
  questionLabel2: string = '';
  questionLabel3: string = '';
  







   constructor(private utilisateurService: UtilisateurService,
                private fileService: FileService
   ) {}
  
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
    this.getUtilisateur();
    this.totp = localStorage.getItem('totp');
    this.loadQuestions();
  }

  public getUtilisateur(): void {
  const username = localStorage.getItem('username'); 

  if (username) {
    this.utilisateurService.findUtilisateurusername(username).subscribe(
      (data: Utilisateur) => {
        this.utilisateurusername = data;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  } else {
    alert('Connexion expirée. Veuillez vous reconnecter.');
  }
}

public desactiverTotp(): void {
  if (!confirm('Confirmez-vous la désactivation du TOTP ?')) {
    return;
  }
  const username = localStorage.getItem('username');
  if (!username) {
    alert('Username non trouvé.');
    return;
  }




  const updateTotp = {
    ...this.utilisateurusername,
    totp: false 
  };

  this.utilisateurService.updateUtilisateurusername(updateTotp as any, username).subscribe(
    (updatedData: any) => {
      alert('TOTP désactivé avec succès.');
    },
    (error: HttpErrorResponse) => {
      alert('Erreur lors de la désactivation du TOTP : ' + error.message);
    }
  );
}


  
openModal(field: string) {
    this.currentField = field;
    this.updatedValue = (this.utilisateurusername as any)[field]; 
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveChange() {
    if (!confirm(`Voulez-vous vraiment enregistrer la modification de "${this.currentField}" ?`)) {
    return;
  }
    const username = localStorage.getItem('username');
    if (!username) {
      alert('Username not found.');
      return;
    }

    const updatedUtilisateur = { ...this.utilisateurusername }; 
    (updatedUtilisateur as any)[this.currentField] = this.updatedValue; 

    this.utilisateurService.updateUtilisateurusername(updatedUtilisateur, username).subscribe(
      (updatedData: Utilisateur) => {
        (this.utilisateurusername as any)[this.currentField] = this.updatedValue;
        this.closeModal();
        alert('Modification réussie.');
      },
      (error: HttpErrorResponse) => {
        alert('Erreur lors de la mise à jour: ' + error.message);
      }
    );
  }


    renitiamdp(): void {
      if (!confirm('Êtes-vous sûr de vouloir recevoir un mail de réinitialisation ?')) {
    return;
  }
    const username = localStorage.getItem('username');

    if (username) {
      this.utilisateurService.resetPassword(username).subscribe(
        (response) => {
          alert('Un mail de réinitialisation a été envoyé à votre adresse e-mail.');

        },
        (error) => {
          alert("Vous ne pouvez pas changer votre mot de passe pour le moment.");
          console.error('Vous ne pouvez pas réinitialiser votre mot de passe pour le moment', error);

        }
      );
    } else {
      console.error('Aucun nom d\'utilisateur trouvé dans le localStorage');

    }
  }


  openQuestionModal() {
  this.isQuestionModalOpen = true;
}

closeQuestionModal() {
  this.isQuestionModalOpen = false;
}

normalizeString(str: string): string {
  return str
    .normalize("NFD")                   
    .replace(/[\u0300-\u036f]/g, "")   
    .replace(/\s+/g, "")               
    .toUpperCase();                    
}

submitQuestions() {
  const reponsean= this.question1+this.reponse1.toUpperCase()+this.question2+this.reponse2.toUpperCase()+this.question3+this.reponse3.toUpperCase();
  const reponse = this.normalizeString(reponsean);
  const username = localStorage.getItem('username');
   if (!confirm('Confirmez-vous vos réponses aux questions de sécurité ?')) {
    return;
  }
  if (username!== null) {
        this.fileService.verifQuestionSecu(username).subscribe(
        (response) => {
          if(response===reponse){
          console.log('Réponses de sécurité verfaaaaaaaaa');
          alert('Voici votre username : ' + username);
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

 saveReferrer() {
  sessionStorage.setItem('from', 'true');
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