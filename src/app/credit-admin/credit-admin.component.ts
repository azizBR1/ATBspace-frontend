import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CreditService } from './credit.service';
import { Credit } from './credit';
import { CommonModule } from '@angular/common';
import flatpickr from "flatpickr";
import { Instance as FlatpickrInstance } from "flatpickr/dist/types/instance";

@Component({
  selector: 'app-credit-admin',
  standalone: true,
  imports: [RouterLink, RouterOutlet,FormsModule,HttpClientModule,CommonModule],
  providers: [CreditService],
  templateUrl: './credit-admin.component.html',
  styleUrl: './credit-admin.component.css'
})
export class CreditAdminComponent implements OnInit, OnDestroy {
  isSidebarExpanded = false;
  credits: Credit[] = [];
  private flatpickrInstance: FlatpickrInstance | FlatpickrInstance[] | undefined;
  constructor(private creditService: CreditService) { }
  blockedDates: Date[] = [];
  creditform = false;
  


   saveReferrer() {
  sessionStorage.setItem('from', 'true');
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


  ngOnInit(): void {
    this.loadcredit();
  }
  closeform(){
    this.creditform = false;
  }


  ngOnDestroy(): void {
    if (Array.isArray(this.flatpickrInstance)) {
      this.flatpickrInstance.forEach(instance => instance.destroy());
    } else if (this.flatpickrInstance) {
      this.flatpickrInstance.destroy();
    }
  }


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
              console.log(this.blockedDates[0]);
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

  Credit: Credit = {
    id: 0,
    code: 0,
    type: '',
    statut: '',
    date: new Date(),
    username: ''
  };

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

  onSubmit(): void {
    const username = localStorage.getItem('username') || 'defaultUser';
    this.Credit.username = username;
    const statut="Bloqué";
    const type = "HBloqué";
    this.Credit.type = type;
    this.Credit.statut = statut;
    const d = new Date(this.Credit.date);
    const corrected = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    this.Credit.date = corrected;
    const hour = d.getHours();
    const datesHeuresBloquees: Date[] = [];





    if (hour === 12) {
      return alert("c'est l'heure de pause !");
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
        console.log('rdv  ajouté avec succès:', response);
        alert('rdv  ajouté avec succès !');
        this.resetForm();
        this.loadcredit();
        
      },
      (error) => {
        console.error(error);
         alert('Une erreur est survenue');
      }
    );


}

onUpdate(): void {
  const d = new Date(this.Credit.date);
  const corrected = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  this.Credit.date = corrected;

  this.creditService.updatecredit(this.Credit).subscribe(
    (response) => {
      console.log('Crédit mis à jour avec succès :', response);
      alert('rdv  mis à jour avec succès !');
      this.creditform = !this.creditform;

      this.loadcredit();
    },
    (error) => {
      console.error('Erreur lors de la mise à jour du rdv  :', error);
      alert('Une erreur est survenue lors de la mise à jour');
    }
  );
}

deleteCredit(credit: Credit) : void {
  if (credit.id) {
  this.creditService.deletecredit(credit.id).subscribe(() => {
    console.log("rdv  supp avec succès :", credit.id);
    alert("rdv supp avec succès")
    this.loadcredit();
  });
} else {
  console.error("ID du rdv  non défini :", credit);
}
}

editCredit(credit: Credit): void {
  this.creditform = !this.creditform;
  this.Credit = { ...credit };
}


blockFullDay(): void {
  const username = localStorage.getItem('username') || 'defaultUser';
  this.Credit.username = username;
  const statut="En Attente";
  this.Credit.statut = statut;
  const type = "JBloqué";
  this.Credit.type = type;
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


}
