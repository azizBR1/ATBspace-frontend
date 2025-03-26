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

    public addUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur>{
        const headers = this.getHeaders();

        return this.http.post<Utilisateur>(`${this.apiServerUrl}/utilisateur/add`, utilisateur);
    }

    public updateUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur>{
        const headers = this.getHeaders();

        return this.http.put<Utilisateur>(`${this.apiServerUrl}/utilisateur/update`, utilisateur, { headers });
    }

    public deleteUtilisateur(utilisateurId: number): Observable<void>{
        const headers = this.getHeaders();

        return this.http.delete<void>(`${this.apiServerUrl}/utilisateur/delete/${utilisateurId}`, { headers });
    }

}