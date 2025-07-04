import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credit } from './credit';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditService {
  private apiServerUrl = 'http://localhost:8090';


  private getHeaders(): HttpHeaders {
            const token = localStorage.getItem('token');
            let headers = new HttpHeaders();
    
            if (token) {
                headers = headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
  

  constructor(private http: HttpClient) { }

public getcredits(): Observable<Credit[]> {
    const headers = this.getHeaders();
    return this.http.get<Credit[]>(`${this.apiServerUrl}/credit/all`, { headers });
  }

  public addcredit(username: string, Type: string, date: Date, statut: string): Observable<Credit> {
    const formData: FormData = new FormData();
    formData.append('username', username);
    formData.append('Type', Type);
    const dateObj = new Date(date);
    formData.append('date', dateObj.toISOString());
    formData.append('statut', statut);
    const headers = this.getHeaders();
return this.http.post<Credit>(`${this.apiServerUrl}/credit/add`, formData, { headers });
}

public deletecredit(id: number): Observable<void> {
  const headers = this.getHeaders();
  return this.http.delete<void>(`${this.apiServerUrl}/credit/${id}`, { headers });
}

public updatecredit(credit: Credit): Observable<Credit> {
  const headers = this.getHeaders();
  return this.http.put<Credit>(`${this.apiServerUrl}/credit/update`, credit, { headers });

}
}
