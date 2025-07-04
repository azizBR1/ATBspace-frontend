import { Component } from '@angular/core';

@Component({
  selector: 'app-credit-tahawel',
  standalone: true,
  imports: [],
  templateUrl: './credit-tahawel.component.html',
  styleUrl: './credit-tahawel.component.css'
})
export class CreditTahawelComponent {
  isSidebarExpanded = false;
        
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

