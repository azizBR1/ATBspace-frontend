import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-espace-utilisateur',
  standalone: true,
  imports: [RouterLink, RouterOutlet,FormsModule,HttpClientModule],
  templateUrl: './espace-utilisateur.component.html',
  styleUrl: './espace-utilisateur.component.css'
})
export class EspaceUtilisateurComponent implements OnInit {
  
  phrases: string[] = [
    "Savez-vous que l’ATB est l’une des banques les plus innovantes du pays ?",
    "Saviez-vous que l’ATB propose des solutions de paiement sécurisées et modernes ?",
    "Savez-vous que vous pouvez demander votre carte ATB en ligne, sans vous déplacer ?",
    "Saviez-vous que l’ATB vous accompagne aussi bien en Tunisie qu’à l’étranger ?",
    "Saviez-vous que l’ATB propose une large gamme de cartes bancaires adaptées à vos besoins ?",
    "Connaissez-vous les services en ligne que l’ATB met à votre disposition 24h/24 ?"
  ];

  icons: string[] = ['💡', '🔒', '💳', '🌍', '📦', '📱'];
  phrase: string = '';
  icon: string = '';
  isSidebarExpanded = false;
  username: string | null = '';


  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    const randomIndex = Math.floor(Math.random() * 6);
    this.phrase = this.phrases[randomIndex];
    this.icon = this.icons[randomIndex];
  }
        
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


}
