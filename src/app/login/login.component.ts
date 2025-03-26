import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { UtilisateurService } from '../utilisateur/utilisateur.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterOutlet,FormsModule,HttpClientModule],
  providers: [UtilisateurService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router: Router) { }

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


}
