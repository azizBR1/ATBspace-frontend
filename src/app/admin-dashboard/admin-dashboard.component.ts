import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink, RouterOutlet,FormsModule,HttpClientModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
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
