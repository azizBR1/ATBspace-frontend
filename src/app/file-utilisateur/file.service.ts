import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Position } from './file';
import { Utilisateur } from '../utilisateur/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class FileService {
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



 public addposition(username: string, duree: number , service: string): Observable<Position> {
    const formData: FormData = new FormData();
    formData.append('username', username);
    formData.append('duree', duree.toString());
    formData.append('service', service);

    const headers = this.getHeaders();
    return this.http.post<Position>(`${this.apiServerUrl}/file/add`, formData, { headers });
  }

  public getPositons(): Observable<Position[]> {
    const headers = this.getHeaders();
    return this.http.get<Position[]>(`${this.apiServerUrl}/file/all`, { headers });
  }

public getposition(username: string): Observable<Position> {
  const headers = this.getHeaders();
  return this.http.get<Position>(`${this.apiServerUrl}/file/${username}`, { headers });
}
public Deletepositon() {
  const headers = this.getHeaders();
  return this.http.delete(`${this.apiServerUrl}/file/positiond`, { headers });
}






public verifQuestionSecu(username: string): Observable<string> {
  const headers = this.getHeaders();
  return this.http.post<string>(
    `${this.apiServerUrl}/file/verif-qsecu?username=${username}`,null,{ headers, responseType: 'text' as 'json' }
  );
}

public verifQuestionSecumail(email: string): Observable<string> {
  const headers = this.getHeaders();
  return this.http.post<string>(
    `${this.apiServerUrl}/file/usernameoublie?email=${email}`,null,{ headers, responseType: 'text' as 'json' }
  );
}

public verifMDPSecumail(email: string): Observable<string> {
  const headers = this.getHeaders();
  return this.http.post<string>(
    `${this.apiServerUrl}/file/mdpoublie?email=${email}`,null,{ headers, responseType: 'text' as 'json' }
  );
}


public addQuestionSecu(username: string, reponseQ: string): Observable<Utilisateur> {
  const body = { username, reponseQ };
  return this.http.put<Utilisateur>(`${this.apiServerUrl}/add-qsecu`, body);
}



}
