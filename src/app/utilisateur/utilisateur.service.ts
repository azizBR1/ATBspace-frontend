import { Injectable } from "@angular/core";
import { Utilisateur } from "./utilisateur";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class UtilisateurService {
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

    public getUtilisateur(): Observable<Utilisateur[]>{
        const headers = this.getHeaders();

        return this.http.get<Utilisateur[]>(`${this.apiServerUrl}/utilisateur/all`, { headers });
    }

    public findUtilisateurusername(username: String): Observable<Utilisateur>{
        const headers = this.getHeaders();

        return this.http.get<Utilisateur>(`${this.apiServerUrl}/finduser/${username}`, { headers });
    }

    

    public addUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur>{
        const headers = this.getHeaders();

        return this.http.post<Utilisateur>(`${this.apiServerUrl}/utilisateur/add`, utilisateur);
    }

    public updateUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur>{
        const headers = this.getHeaders();

        return this.http.put<Utilisateur>(`${this.apiServerUrl}/utilisateur/update`, utilisateur, { headers });
    }

    public updateUtilisateurusername(utilisateur: Utilisateur, username: String): Observable<Utilisateur>{
        const headers = this.getHeaders();

        return this.http.put<Utilisateur>(`${this.apiServerUrl}/updateutilisateur/${username}`, utilisateur, { headers });
    }




    public deleteUtilisateur(utilisateurId: number): Observable<void>{
        const headers = this.getHeaders();

        return this.http.delete<void>(`${this.apiServerUrl}/utilisateur/delete/${utilisateurId}`, { headers });
    }

    public checkUsernameExists(username: string): Observable<boolean> {

        return this.http.get<boolean>(`${this.apiServerUrl}/utilisateur/existe?username=${username}`);
      }
      



  public changePassword(username: string, newPassword: string): Observable<string> {
  const params = {
    username: username,
    newmdp: newPassword
  };
  return this.http.put<string>(`${this.apiServerUrl}/utilisateur/change-password`, null, { params });
}

public changePasswordoublie(username: string, newPassword: string): Observable<string> {
  const headers = this.getHeaders();
  const params = {
    username: username,
    newmdp: newPassword 
  };
  return this.http.put<string>(`${this.apiServerUrl}/file/change-passwordoublie`, null, { params, headers });
}



public resetPassword(username: string): Observable<Utilisateur> {
    const headers = this.getHeaders();
    return this.http.post<Utilisateur>(`${this.apiServerUrl}/file/mdpoublie/${username}`, null, { headers });
}


public resetPasswordchange(email: string): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(`${this.apiServerUrl}/file/mdpoubliechange/${email}`, null,);
}




public resetUsername(email: string): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(`${this.apiServerUrl}/file/usernameoublie/${email}`, null);
}


 public checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiServerUrl}/file/emailexists`,{params: { email }} );}

}