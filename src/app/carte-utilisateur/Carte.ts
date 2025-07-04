import { Utilisateur } from "../utilisateur/utilisateur";

export interface Carte {
  id: number;   
  code: number;   
  type: string;  
  statut: string; 
  date: string;   
  utilisateur: Utilisateur; 
}