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
  isSidebarExpanded = false;
  reclamations: Reclamation[] = [];
  Reclamationsfl: any[] = [];
  recherche: string = '';
  successMessage = '';



 constructor(private reclamationService: ReclamationUtilisateurService,
  private http: HttpClient
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


 saveReferrer() {
  sessionStorage.setItem('from', 'true');
}

  ngOnInit(): void {
    this.loadReclamations();
  }
  filterReclamations() {
    const query = this.recherche.toLowerCase().trim();
    this.Reclamationsfl = this.reclamations.filter(reclamation =>
      reclamation.id.toString().includes(query) ||
      (reclamation.type && reclamation.type.toLowerCase().includes(query)) ||
      (reclamation.statut && reclamation.statut.toLowerCase().includes(query))
    );
  }

  showSuccessMessage(message: string): void {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }


  updateReclamationStatus(reclamation: Reclamation, newStatus: string): void {
    // Vérifie si le statut est déjà le même
    if (reclamation.statut === newStatus) {
      return;
    }
  
    // Crée une copie de la réclamation avec le statut mis à jour
    const updatedReclamation: Reclamation = {
      ...reclamation,
      statut: newStatus
    };
  
    this.reclamationService.updateReclamation(updatedReclamation).subscribe(
      (updated) => {
        // Met à jour le statut localement dans la liste (pour l'affichage immédiat)
        reclamation.statut = updated.statut;
        console.log(`Statut mis à jour vers : ${updated.statut}`);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du statut :', error);
      }
    );
  }
  

  loadReclamations(): void {
    this.reclamationService.getReclamation().subscribe(
      (data: Reclamation[]) => {
        this.reclamations = data;
        this.Reclamationsfl = data;
      },
      (error) => {
        console.error('Erreur reclamations:', error);
      }
    );
  }
  
public apiServerUrl = 'http://localhost:8090';


deleteReclamation(id: number): void {
  this.reclamationService.deleteReclamation(id).subscribe({
    next: () => {
      // Après suppression, recharger la liste des réclamations
      this.loadReclamations();
      this.showSuccessMessage(`Reclamation ${id} supprimée avec succès`);
    },
    error: (err) => {
      console.error('Erreur');
    }
  });
}


private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('token');
        let headers = new HttpHeaders();

        if (token) {
            headers = headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }







    isValidLink(url: string | null): boolean {
      return typeof url === 'string' && url.startsWith('http');
    }



    downloadFile(fileUrl: string): void {
      if (!fileUrl) return;
    
      const a = document.createElement('a');
      a.href = fileUrl;
      a.target = '_blank'; // Opens in a new tab
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
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
