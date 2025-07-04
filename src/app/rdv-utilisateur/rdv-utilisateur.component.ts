import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CreditService } from '../credit-admin/credit.service';
import { Credit } from '../credit-admin/credit';
import flatpickr from "flatpickr";
import { Instance as FlatpickrInstance } from "flatpickr/dist/types/instance";

@Component({
  selector: 'app-rdv-utilisateur',
  standalone: true,
  imports: [RouterLink, RouterOutlet,FormsModule,HttpClientModule,CommonModule],
  providers: [CreditService],
  templateUrl: './rdv-utilisateur.component.html',
  styleUrl: './rdv-utilisateur.component.css'
})
export class RdvUtilisateurComponent implements OnInit, OnDestroy {
  private flatpickrInstance: FlatpickrInstance | FlatpickrInstance[] | undefined;
  isSidebarExpanded = false;
  credits: Credit[] = [];
  blockedDates: Date[] = [];

  constructor(private creditService: CreditService) { }



  


 loadcredit(): void{
    this.creditService.getcredits().subscribe(data => {
      this.credits = data;
      setTimeout(() => {
        this.blockedDates = this.credits
          .filter(c => c.type === 'JBloqué')
          .map(c => new Date(c.date));
  
        const today = new Date();
        const twoWeeksLater = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
  
        this.flatpickrInstance = flatpickr("#rdvDateTimePicker", {
          inline: true,
          appendTo: document.getElementById("calendarContainer")!,
          enableTime: true,
          time_24hr: true,
          dateFormat: "Y-m-d H:i",
          minDate: today,
          maxDate: twoWeeksLater,
          minTime: "08:00",
          maxTime: "16:00",
          minuteIncrement: 60,
          disable: [
            (date) => {
              const day = date.getDay();
              const hour = date.getHours();
              const isBlocked = this.blockedDates.some(blockedDate => 
              blockedDate.getFullYear() === date.getFullYear() &&
              blockedDate.getMonth() === date.getMonth() &&
              blockedDate.getDate() === date.getDate()
            );
              return day === 0 || day === 6 || hour === 12 || isBlocked;
            }
          ],
          
          locale: {
            firstDayOfWeek: 1,
          },
        });
      }, 0); 
    });
  }


  ngOnInit(): void {
    this.loadcredit();
  }

  ngOnDestroy(): void {
    if (Array.isArray(this.flatpickrInstance)) {
      this.flatpickrInstance.forEach(instance => instance.destroy());
    } else if (this.flatpickrInstance) {
      this.flatpickrInstance.destroy();
    }
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
        toggleButton.style.left = '290px';
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





  Credit: Credit = {
      id: 0,
      code: 0,
      type: '',
      statut: '',
      date: new Date(),
      username: ''
    };
  

onSubmit(): void {
    const username = localStorage.getItem('username') || 'defaultUser';
    this.Credit.username = username;
    const statut="En Attente";
    this.Credit.statut = statut;
    const d = new Date(this.Credit.date);
    const corrected = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    this.Credit.date = corrected;
    const hour = d.getHours();
    const datesHeuresBloquees: Date[] = [];





    if (hour === 12) {
      return alert("Désolé, c'est l'heure de pause !");
    }

    this.credits.forEach(credit => {
      if (credit.statut === 'Bloqué') {
        datesHeuresBloquees.push(new Date(credit.date));
      }
    });

    for (const dateBloquee of datesHeuresBloquees) {
      if (
        d.getFullYear() === dateBloquee.getFullYear() &&
        d.getMonth() === dateBloquee.getMonth() &&
        d.getDate() === dateBloquee.getDate() &&
        d.getHours() === dateBloquee.getHours()
      ) {
        return alert('Ce créneau est déjà réservé !');
      }
    }



    this.creditService.addcredit(this.Credit.username,this.Credit.type, this.Credit.date, this.Credit.statut)
    .subscribe(
      (response) => {
        console.log('Credit ajouté avec succès:', response);
        alert('Credit ajouté avec succès !');
        this.resetForm();
        this.loadcredit();
        
      },
      (error) => {
        console.error(error);
         alert('Une erreur est survenue');
      }
    );


}


isFormValid(): boolean {

  const isDateSelected = this.Credit && this.Credit.date;
  

  const isTypeSelected = this.Credit && this.Credit.type;

  return !!(isDateSelected && isTypeSelected);
}


resetForm(): void {
    this.Credit = {
      id: 0,
      code: 0,
      type: '',
      statut: '',
      date: new Date(),
      username: ''
    };
  }



}
