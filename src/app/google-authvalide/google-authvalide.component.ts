import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Utilisateur } from '../utilisateur/utilisateur';

@Component({
  selector: 'app-google-authvalide',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './google-authvalide.component.html',
  styleUrl: './google-authvalide.component.css'
})
export class GoogleAuthvalideComponent {
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

verifyTOTP() {
  if (this.totpForm.valid) {
    const username = localStorage.getItem('username');  
    const totpCode = Object.values(this.totpForm.value).join('');
    console.log('Form Values:', totpCode);
  
this.http.post<Utilisateur>('http://localhost:8090/authtotp', { username, code: totpCode })
      .subscribe({
        next: (response) => {
          if (response) {
            this.verificationSuccess = true;
            this.verificationResult = 'Verification successful!';
            this.router.navigate(['/espace-utilisateur']); // Redirection après succès
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


 saveReferrer() {
  sessionStorage.setItem('from', 'true');
}

}
