import { provideRouter, Routes, withHashLocation } from '@angular/router';
import { NewuserComponent } from './newuser/newuser.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { GestUtilisateursComponent } from './gest-utilisateurs/gest-utilisateurs.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GoogleAuthComponent } from './google-auth/google-auth.component';
import { GoogleAuthvalideComponent } from './google-authvalide/google-authvalide.component';
import { EspaceUtilisateurComponent } from './espace-utilisateur/espace-utilisateur.component';
import { EspaceEmployerComponent } from './espace-employer/espace-employer.component';
import { ReclamationUtilisateurComponent } from './reclamation-utilisateur/reclamation-utilisateur.component';
import { ReclamationAdminComponent } from './reclamation-admin/reclamation-admin.component';
import { CurrencyUtilisateurComponent } from './currency-utilisateur/currency-utilisateur.component';

export const routes: Routes = [

    { path: 'newuser', component: NewuserComponent},
    
    {path: '', component:AppComponent},
    { path: 'login', component:LoginComponent},
    { path: 'admin-dashboard', component: AdminDashboardComponent},     
    { path: 'gest-utilisateurs', component: GestUtilisateursComponent},
    { path:'google-auth',component:GoogleAuthComponent},
    {path:'google-authvalide',component:GoogleAuthvalideComponent},
    {path:'espace-utilisateur',component:EspaceUtilisateurComponent},
    {path:'espace-employé',component:EspaceEmployerComponent},
    {path:'reclamation-utilisateur',component:ReclamationUtilisateurComponent},
    {path:'reclamation-admin',component:ReclamationAdminComponent},
    {path:'currency-utilisateur',component:CurrencyUtilisateurComponent}
           
        
    ]


export const appRouting = provideRouter(routes, withHashLocation()); 
