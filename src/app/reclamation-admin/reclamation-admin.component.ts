import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ReclamationUtilisateurService } from '../reclamation-utilisateur/reclamation-utilisateur.service';
import { Reclamation } from '../reclamation-utilisateur/Reclamation';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reclamation-admin',
  standalone: true,
  imports: [RouterLink, RouterOutlet,FormsModule,CommonModule,HttpClientModule],
  providers: [ReclamationUtilisateurService],
  templateUrl: './reclamation-admin.component.html',
  styleUrl: './reclamation-admin.component.css'
})
export class ReclamationAdminComponent {
  reclamations: Reclamation[] = [];



 constructor(private reclamationService: ReclamationUtilisateurService,
  private http: HttpClient
  ) {}




  ngOnInit(): void {
    this.loadReclamations();
  }

  loadReclamations(): void {
    this.reclamationService.getReclamation().subscribe(
      (data: Reclamation[]) => {
        this.reclamations = data;
      },
      (error) => {
        console.error('Error fetching reclamations:', error);
      }
    );
  }
public apiServerUrl = 'http://localhost:8090'
downloadFile(reclamation: Reclamation): void {
  if (!reclamation.pieceJointe) {
    console.error('No file attached to this reclamation.');
    return;
  }

  const headers = this.getHeaders();
  this.http
    .get(`${this.apiServerUrl}/reclamations/${reclamation.id}/file`, {
      headers: headers,
      responseType: 'blob', // Indicate that the response is a binary file
    })
    .subscribe(
      (file: Blob) => {
        // Create a Blob URL for the file
        const url = window.URL.createObjectURL(file);

        // Open the file in a new tab or download it
        if (file.type.includes('image') || file.type.includes('pdf')) {
          window.open(url); // Open images and PDFs in a new tab
        } else {
          const a = document.createElement('a');
          a.href = url;
          a.download = `file_${reclamation.id}`; // Set a default filename
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }

        // Clean up the Blob URL
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error downloading file:', error);
      }
    );
}
private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('token');
        let headers = new HttpHeaders();

        if (token) {
            headers = headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }


















  reclamation: Reclamation = {
    id: 0,
    username: '',
    description: '',
    date: new Date(),
    statut: '',
    type: '',
    pieceJointe: null
  };




  showFile(id: number) {
    this.reclamationService.getFile(id).subscribe(file => {
      const url = window.URL.createObjectURL(file);
      const fileType = file.type;
  
      if (fileType.includes("image")) {
        // Open image in a new tab
        window.open(url);
      } else if (fileType.includes("pdf")) {
        // Open PDF in a new tab
        window.open(url);
      } else {
        // Download other file types
        const a = document.createElement('a');
        a.href = url;
        a.download = "file"; 
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    });
  }

}
