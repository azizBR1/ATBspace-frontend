import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reclamation } from './Reclamation';

@Injectable({
  providedIn: 'root'
})
export class ReclamationUtilisateurService {
  private apiServerUrl = 'http://localhost:8090';

 private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('token');
        let headers = new HttpHeaders();

        if (token) {
            headers = headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
  constructor(private http: HttpClient){}

  

  public getReclamation(): Observable<Reclamation[]> {
    const headers = this.getHeaders();
    return this.http.get<Reclamation[]>(`${this.apiServerUrl}/reclamations/all`, { headers });
  }

  public getReclamationsByUserId(username: string): Observable<Reclamation[]> {
    const headers = this.getHeaders();
    return this.http.get<Reclamation[]>(`${this.apiServerUrl}/reclamations/${username}`, { headers });
  }
  
 
  public addReclamation(description: string, type: string, username: string, file?: File): Observable<Reclamation> {
    const formData: FormData = new FormData();
    formData.append('description', description);
    formData.append('type', type);
    formData.append('username', username);

    if (file) {
      formData.append('file', file, file.name);
    }

    const headers = this.getHeaders();
    return this.http.post<Reclamation>(`${this.apiServerUrl}/reclamations/add`, formData, { headers });
  }

  // Supprimer une réclamation
  public deleteReclamation(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiServerUrl}/reclamations/${id}`, { headers });
  }


  public updateReclamation(reclamation: Reclamation): Observable<Reclamation> {
    const headers = this.getHeaders();
    return this.http.put<Reclamation>(`${this.apiServerUrl}/reclamations`, reclamation, { headers });
  }




  public getFile(id: number): Observable<Blob> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiServerUrl}/reclamations/${id}/file`, {
      headers,
      responseType: 'blob'
    });
  }


}

