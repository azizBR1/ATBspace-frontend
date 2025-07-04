import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Currency } from './currency';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = 'http://localhost:8090/currencies';

   private getHeaders(): HttpHeaders {
          const token = localStorage.getItem('token');
          let headers = new HttpHeaders();
  
          if (token) {
              headers = headers.set('Authorization', `Bearer ${token}`);
          }
          return headers;
      }

  constructor(private http: HttpClient) { }

  getCurrencies(): Observable<Currency[]> {
    const headers = this.getHeaders();
    return this.http.get<Currency[]>(this.apiUrl, { headers });
  }
  getCurrencyByCode(code: string): Observable<Currency> {
    const headers = this.getHeaders();
    return this.http.get<Currency>(`${this.apiUrl}/${code}`, { headers });
  }

 
  addCurrency(currency: Currency): Observable<Currency> {
    const headers = this.getHeaders();
    return this.http.post<Currency>(this.apiUrl, currency, {headers});
  }


  updateCurrency(id: number, currency: Currency): Observable<Currency> {
    const headers = this.getHeaders();
    return this.http.put<Currency>(`${this.apiUrl}/${id}`, currency, {headers});
  }


  deleteCurrency(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {headers});
  }

}
