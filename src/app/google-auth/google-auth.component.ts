import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRCodeComponent } from 'angularx-qrcode';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Utilisateur } from '../utilisateur/utilisateur';

@Component({
  selector: 'app-google-auth',
  standalone: true,
  imports: [CommonModule, QRCodeComponent, ReactiveFormsModule, HttpClientModule],
  templateUrl: './google-auth.component.html',
  styleUrl: './google-auth.component.css'
})
export class GoogleAuthComponent implements OnInit {
  verificationResult: string | null = null;
  qrData: string | null = null;
  verificationSuccess: boolean = false;


  totpForm = new FormGroup({
    digit1: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
    digit2: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
    digit3: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
    digit4: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
    digit5: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
    digit6: new FormControl('', [Validators.required, Validators.pattern('[0-9]')])
  });

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.qrData = localStorage.getItem('qrcode');
  }





  verifyTOTP() {
    if (this.totpForm.valid) {
      const username = localStorage.getItem('username');
      if (!username) {
        this.verificationSuccess = false;
        this.verificationResult = 'Erreur : utilisateur non trouvé.';
        return;
      }  
      const totpCode = Object.values(this.totpForm.value).join('');
      console.log('Form Values:', totpCode);



      this.http.post<Utilisateur>('http://localhost:8090/authtotp', { username, code: totpCode })
      .subscribe({
        next: (response) => {
          if (response) {
            this.verificationSuccess = true;
            this.verificationResult = 'Verification successful!';
            this.updateTotpStatus(username);
            this.router.navigate(['/espace-utilisateur']);
          } else {
            this.verificationSuccess = false;
            this.verificationResult = 'Invalid code. Please try again.';
          }
        },
        error: (err) => {
          this.verificationSuccess = false;
          this.verificationResult = 'Invalid code. Please try again.';
        }
      });
    } else {
      this.verificationSuccess = false;
      this.verificationResult = 'Please enter a valid 6-digit code.';
    }
  }

  @ViewChildren('digitInput') digitInputs!: QueryList<ElementRef>;

  moveFocus(index: number, event: any) {
    const value = event.target.value;
    if (value.length === 1 && index < 5) {
      this.digitInputs.toArray()[index + 1].nativeElement.focus();
    } else if (value.length === 0 && index > 0) {
      this.digitInputs.toArray()[index - 1].nativeElement.focus();
    }
  }

  


  updateTotpStatus(username: string) {
    this.http.put(`http://localhost:8090/update-totp`, { username: username, totp: true }).subscribe(
      () => {
        console.log("totp mis à jour avec succès !");
      },
      (error: any) => {
        console.error("Erreur lors de la mise à jour de totp :", error);
      }
    );
  }
}