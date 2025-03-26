import { Component, OnInit } from '@angular/core';
import { Currency } from './currency';
import { CurrencyService } from './currency.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-currency-utilisateur',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  templateUrl: './currency-utilisateur.component.html',
  styleUrl: './currency-utilisateur.component.css'
})
export class CurrencyUtilisateurComponent implements OnInit {
  currencies: Currency[] = [];
  
  constructor(private currencyService: CurrencyService) { }


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

}
