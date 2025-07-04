import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carte } from './Carte';

@Injectable({
  providedIn: 'root'
})
export class CarteService {
private apiServerUrl = 'http://localhost:8090/carte';

  private getHeaders(): HttpHeaders {
          const token = localStorage.getItem('token');
          let headers = new HttpHeaders();
  
          if (token) {
              headers = headers.set('Authorization', `Bearer ${token}`);
          }
          return headers;
      }


  constructor(private http: HttpClient){}


   getAllCarte(): Observable<Carte[]> {
    const headers = this.getHeaders();
    return this.http.get<Carte[]>(`${this.apiServerUrl}/all`, {headers});
  }

  public adddemande(username: string, Type: string , statut: string): Observable<Carte> {
      const formData: FormData = new FormData();
      formData.append('username', username);
      formData.append('Type', Type);
      formData.append('statut', statut);
  
      const headers = this.getHeaders();
      return this.http.post<Carte>(`${this.apiServerUrl}/add`, formData, { headers });
    }

   public deletedemande(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiServerUrl}/${id}`, { headers });
}
public updateCarte(carte: Carte): Observable<Carte> {
  const headers = this.getHeaders();
  return this.http.put<Carte>(`${this.apiServerUrl}/update`, carte, { headers });
}



public getCartesByUsername(username: string): Observable<Carte[]> {
  const headers = this.getHeaders();
  return this.http.get<Carte[]>(`${this.apiServerUrl}/${username}`, { headers });
}
}
