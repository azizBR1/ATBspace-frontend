import { Component, OnInit } from '@angular/core';
import { Currency } from '../currency-utilisateur/currency';
import { CurrencyService } from '../currency-utilisateur/currency.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-currency-admin',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './currency-admin.component.html',
  styleUrl: './currency-admin.component.css'
})
export class CurrencyAdminComponent implements OnInit {
  currencies: Currency[] = [];
  isSidebarExpanded = false;
  currencyForm: FormGroup;
  editMode = false;
  currentCurrencyId: number | null = null;
  showEditModal = false;
  showDeleteModal = false;
  showAddModal = false;
  selectedCurrency: any = {}; 
  loading = false;
  errorMessage = '';
  successMessage = '';
 

  
  constructor(
    private currencyService: CurrencyService,
    private fb: FormBuilder
  ) {
    this.currencyForm = this.fb.group({
      code: ['', [Validators.required, Validators.maxLength(3)]],
      unite: [1, [Validators.required, Validators.min(1)]],
      txa: ['', [Validators.required, Validators.min(0)]],
      txv: ['', [Validators.required, Validators.min(0)]]
    });
  }


 saveReferrer() {
  sessionStorage.setItem('from', 'true');
}


  ngOnInit(): void {
    this.loadCurrencies();
  }

  loadCurrencies(): void {
    this.currencyService.getCurrencies().subscribe(
      (data: Currency[]) => {
        this.currencies = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des devises', error);
      }
    );
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


  

  openDeleteModal(currency: Currency): void {
    this.selectedCurrency = currency;
    this.showDeleteModal = true;
  }

  // Close all modals
  closeModals(): void {
    this.showEditModal = false;
    this.showDeleteModal = false;
    this.showAddModal = false;
    this.selectedCurrency = null;
    this.currentCurrencyId = null;
    this.errorMessage = '';
  }

  

  // Delete currency
  deleteCurrency(): void {
    if (!this.selectedCurrency || !this.selectedCurrency.id) {
      return;
    }
    

    this.currencyService.deleteCurrency(this.selectedCurrency.id).subscribe({
      next: () => {
        this.loadCurrencies();
        this.closeModals();
        this.showSuccessMessage('Devise supprimée avec succès');

      },
      error: (error) => {
        console.error('Erreur', error);
        this.errorMessage = 'Erreur lors de la suppression de la devise';
      }
    });
  }

  // Show success message for a few seconds
  showSuccessMessage(message: string): void {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

  // Helper method to get form control error message
  getErrorMessage(controlName: string): string {
    const control = this.currencyForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Ce champ est requis';
    }
    if (control?.hasError('maxlength')) {
      return 'Maximum 3 caractères autorisés';
    }
    if (control?.hasError('min')) {
      return 'La valeur doit être supérieure à 0';
    }
    return '';
  }
  public getCurrency(): void {
    this.currencyService.getCurrencies().subscribe(
      (data: Currency[]) => {
        this.currencies = data;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  onUpdateCurrency(form: NgForm) {
    if (!this.selectedCurrency || !this.selectedCurrency.id) {
      console.error("Selected currency or its ID is missing");
      return;
    }
  
    if (form.invalid) {
      console.warn("Form is invalid");
      return;
    }
  

    const updatedCurrency = {
      ...this.selectedCurrency, 
      code: form.value.code,  
      unite: form.value.unite,
      txa: form.value.txa,
      txv: form.value.txv
    };
  
    this.currencyService.updateCurrency(updatedCurrency.id, updatedCurrency)
      .subscribe({
        next: (updatedCurrency) => {
          console.log("Currency updated successfully:", updatedCurrency);
          this.closeModals();
          this.getCurrency();
        },
        error: (error) => {
          console.error("Error updating currency:", error);
        }
      });
  }
  
  
  

  public onAddCurrency(addForm: NgForm): void {
    this.currencyService.addCurrency(addForm.value).subscribe(
      (response: Currency) => {
        this.getCurrency();
        addForm.reset();
        this.showSuccessMessage('Devise ajoutée avec succès');
        // Close the add modal by setting the flag to false
        this.showAddModal = false;
      },
      (error) => {
        console.error('Erreur', error);
        this.errorMessage = 'Erreur lors de l\'ajout de la devise';
      }
    );
  }
  public onOpenModaledit(currency: Currency): void {
    if (!currency) {
      console.error("Aucune devise sélectionnée !");
      return;
    }
  
    this.selectedCurrency = { ...currency }; // Copie pour éviter les modifications directes sur l'original
    this.currencyForm.reset(this.selectedCurrency); // Remplir le formulaire avec les valeurs actuelles
    this.showEditModal = true;
  }
  
  public onOpenModaladd(mode: string): void {

    this.currencyForm.reset();
    this.showAddModal = true;
  }
}
