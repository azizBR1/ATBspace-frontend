import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { UtilisateurService } from '../utilisateur/utilisateur.service';
import { FileService } from '../file-utilisateur/file.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterOutlet,FormsModule,HttpClientModule,CommonModule],
  providers: [UtilisateurService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public isUsernameModalOpen = false;
  public isUsernameModalOpen2 = false;
  public email: string = '';
  public emailExist: boolean = true;

  constructor(private utilisateurService: UtilisateurService,
              private fileService: FileService,private router: Router
  ){}

  

 openUsernameModal() {
  this.isUsernameModalOpen = true;
}

closeUsernameModal() {
  this.isUsernameModalOpen = false;
}


 openUsernameModal2() {
  this.isUsernameModalOpen2 = true;
}

closeUsernameModal2() {
  this.isUsernameModalOpen2 = false;
}

  logs: any = {
    "username": "",
    "mdp": ""
  };

  http=inject(HttpClient)

  onLogin() {
   
    this.http.post('http://localhost:8090/login', this.logs, { responseType: 'text' }).subscribe(
      (response: any) => {
        if (response) {
          const [jwtToken, role, qrcodeurl,username,status,totp] = response.split("||");
          if (jwtToken) {

            localStorage.setItem('token', jwtToken);
    
            localStorage.setItem('role', role);

            localStorage.setItem('qrcode', qrcodeurl);

            localStorage.setItem('username', username);

            localStorage.setItem('status', status);

            localStorage.setItem('totp', totp);

           
           
            


    

            this.redirectUser(role ,status,totp);
          } 
        }
       
      },
      (error: any) => {
        alert("Votre nom d'utilisateur ou mot de passe est incorrect");
      }

    )


}

redirectUser(role: string, status: string, totp: string) {
  if (role === 'ADMIN') {
      sessionStorage.setItem('from', 'true');
      this.router.navigate(['/admin-dashboard']);

  } else if (role === 'CLIENT') {
    if (status === 'ACTIF') {
      if (totp === "false") {
        this.router.navigate(['/google-auth']);
        return;
      }
      this.router.navigate(['/google-authvalide']);
    } else if (status === 'EN ATTENTE') {
      alert("Votre compte est en attente de validation");
    } else if (status === 'SUSPENDUE') {
      alert("Votre compte est bloqué");
    }
  } else if (role === 'EMPLOYEE') {
    this.router.navigate(['/espace-employé']);
  }
}


submitemail() {
  this.utilisateurService.resetUsername(this.email).subscribe(
        (response) => {
          if (response) {
          this.emailExist = true;
          alert("Un mail a été envoyé à votre adresse e-mail.");
          this.closeUsernameModal();
          }
          else{
            this.emailExist = true;
          }
        },
        (error) => {
          this.emailExist = false;
          console.error('Username??:', error);

        }
      );



}


submitemailMDP() {
  this.utilisateurService.resetPasswordchange(this.email).subscribe(
        (response) => {
          if (response) {
          this.emailExist = true;
          alert("Un mail de réinitialisation a été envoyé à votre adresse e-mail.");
          this.closeUsernameModal();
          }
          else{
            this.emailExist = true;
          }
        },
        (error) => {
          this.emailExist = false;
          console.error('MDP??:', error);

        }
      );



}

}
