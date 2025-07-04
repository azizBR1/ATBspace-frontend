import { Component, input, OnInit } from '@angular/core';
import { Currency } from './currency';
import { CurrencyService } from './currency.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-currency-utilisateur',
  standalone: true,
  imports: [HttpClientModule,CommonModule,RouterLink, RouterOutlet,FormsModule,],
  templateUrl: './currency-utilisateur.component.html',
  styleUrl: './currency-utilisateur.component.css'
})
export class CurrencyUtilisateurComponent implements OnInit {
  currencies: Currency[] = [];
  isSidebarExpanded = false;
  isLeftActive = true;

  inputAmount: number | null = null;
  outputAmount: number | null = null;
  
  constructor(private currencyService: CurrencyService) { }


  toggleAction() {
    this.isLeftActive = !this.isLeftActive;
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



  currencieflag = [
    { code: 'USD'},
    { code: 'AED'},
    { code: 'BHD'},
    { code: 'CAD'},
    { code: 'CHF'},
    { code: 'CNY'},
    { code: 'EUR'},
    { code: 'GBP'},
    { code: 'JPY'},
    { code: 'KWD'},
    { code: 'LYD'},
    { code: 'QAR'},
    { code: 'SAR'}
  ];


  countryFlags: { [key: string]: string } = {
    BHD: 'bahrain.png',  
    EUR: 'european-union.png', 
    USD: 'united-states.png',
    GBP:'united-kingdom.png',
    AED:'united-arab-emirates.png',
    CAD:'canada.png',
    CHF:'switzerland.png',
    CNY:'china.png',
    JPY:'japan.png',
    LYD:'libya.png',
    KWD:'kuwait.png',
    QAR:'qatar.png',
    SAR:'world.png',




  };

  getFlagUrl(code: string): string {
    return `assets/${this.countryFlags[code] || 'atbflag1.png'}`;
  }

  amount: number | null = null;
  currencyTo = 'EUR';


  convertCurrency() {
    if (!this.inputAmount || this.inputAmount <= 0) {
      this.outputAmount = null;
      return;
    }
  
    const selectedCurrency = this.currencies.find(c => c.code === this.currencyTo);
  
    if (!selectedCurrency) {
      console.error('Devise non trouvée');
      this.outputAmount = null;
      return;
    }

    const tauxAchat = selectedCurrency.txa;
    const tauxVente = selectedCurrency.txv; 
  

    const tauxChoisi = this.isLeftActive ? tauxAchat : tauxVente;
  
    this.outputAmount = this.inputAmount * tauxChoisi;
  }
  
}
