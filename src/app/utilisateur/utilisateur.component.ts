import { Component } from '@angular/core';
import { UtilisateurService } from './utilisateur.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-utilisateur',
  standalone: true,
  imports: [],
  providers: [UtilisateurService,HttpClientModule],
  templateUrl: './utilisateur.component.html',
  styleUrl: './utilisateur.component.css'
})
export class UtilisateurComponent {

}
