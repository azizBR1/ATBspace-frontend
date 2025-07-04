import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UtilisateurService } from '../utilisateur/utilisateur.service';
@Component({
  selector: 'app-mdpoublie',
  standalone: true,
  imports: [HttpClientModule,CommonModule, FormsModule],
  templateUrl: './mdpoublie.component.html',
  styleUrl: './mdpoublie.component.css'
})
export class MdpoublieComponent implements OnInit {
  username: string = '';
  hasPassword: boolean = false;
   constructor(private utilisateurService: UtilisateurService,private route: ActivatedRoute) {}


      
  ngOnInit(): void {
    localStorage.clear();
    this.route.queryParams.subscribe(params => {
      const username = params['username'];
      const mdp = params['mdp'];
      if (username) {
        localStorage.setItem('username', username);
        this.username = username; 
      }
      if (mdp) {
      localStorage.setItem('mdp', mdp);
      this.hasPassword = true;
    } else {
      this.hasPassword = false;
    }
    });
  }

  password1: string = '';
  password2: string = '';
  passwordVisible: boolean = false;
  passwordStrength: number = 0;

 changemdp() {
  if (!this.password1 || !this.password2) {
    alert("Veuillez remplir les deux champs de mot de passe.");
    return;
  }

  if (this.password1 !== this.password2) {
    alert("Les mots de passe ne correspondent pas.");
    return;
  }

  const username = localStorage.getItem('username');

  if(this.hasPassword && username!== null) {
    this.utilisateurService.changePasswordoublie(username, this.password1).subscribe(
      (response) => {
        alert("Mot de passe changé avec succès !");     
      },
      (error) => {
        if (error.status === 409) {
          alert("Le nouveau mot de passe doit être différent de l'ancien.");
          } else if (error.status === 200) {
          alert("Mot de passe changé avec succès !");
           setTimeout(() => {
              window.location.href = "http://localhost:4200/#/";
            }, 2000);
        } else {
          alert("Une erreur est survenue.");
        }
      }
    );

  }
  
  else if (username !== null) {
    this.utilisateurService.changePassword(username, this.password1).subscribe(
      (response) => {
        alert("Mot de passe changé avec succès !");
      },
      (error) => {
        if (error.status === 403) {
          alert("Vous ne pouvez pas changer votre mot de passe pour le moment.");
          
        } else if (error.status === 409) {
          alert("Le nouveau mot de passe doit être différent de l'ancien.");
          } else if (error.status === 200) {
          alert("Mot de passe changé avec succès !");
           setTimeout(() => {
              window.location.href = "http://localhost:4200/#/";
            }, 2000);
        } else {
          alert("Une erreur est survenue.");
        }
        console.error('Erreur lors du changement de mot de passe', error);
      }
    );
  }
}


    togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

checkPasswordStrength(value: string): void {
    let strength = 0;
    const hasUppercase = /[A-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[^a-zA-Z0-9]/.test(value);
    const hasLongLength = value.length >= 10;

    if (hasUppercase) strength++;
    if (hasNumber) strength++;
    if (hasSpecialChar) strength++;
    if (hasLongLength) strength++;

    this.passwordStrength = strength;
  }

  getStrengthColor(): string {
    switch (this.passwordStrength) {
      case 1:
        return '#ff1010';
      case 2:
        return '#fff710';
      case 3:
        return '#ffa710';
      case 4:
        return '#2ee600';
      default:
        return 'transparent';
    }
  }
}
