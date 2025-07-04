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
import { CurrencyAdminComponent } from './currency-admin/currency-admin.component';
import { RecprogUtilisateurComponent } from './recprog-utilisateur/recprog-utilisateur.component';
import { FileUtilisateurComponent } from './file-utilisateur/file-utilisateur.component';
import { FileAdminComponent } from './file-admin/file-admin.component';
import { CreditAdminComponent } from './credit-admin/credit-admin.component';
import { CreditUtilisateurComponent } from './credit-utilisateur/credit-utilisateur.component';
import { CreditSakanComponent } from './credit-sakan/credit-sakan.component';
import { CreditSayaraComponent } from './credit-sayara/credit-sayara.component';
import { CreditAwelsakanComponent } from './credit-awelsakan/credit-awelsakan.component';
import { CreditTahawelComponent } from './credit-tahawel/credit-tahawel.component';
import { CreditRenovComponent } from './credit-renov/credit-renov.component';
import { CreditMounassibComponent } from './credit-mounassib/credit-mounassib.component';
import { CreditStartComponent } from './credit-start/credit-start.component';
import { CreditBienetreComponent } from './credit-bienetre/credit-bienetre.component';
import { RdvUtilisateurComponent } from './rdv-utilisateur/rdv-utilisateur.component';
import { ParametreUtilisateurComponent } from './parametre-utilisateur/parametre-utilisateur.component';
import { MdpoublieComponent } from './mdpoublie/mdpoublie.component';
import { UsernameoublieUtilisateurComponent } from './usernameoublie-utilisateur/usernameoublie-utilisateur.component';
import { TestdashboardComponent } from './testdashboard/testdashboard.component';
import { CarteUtilisateurComponent } from './carte-utilisateur/carte-utilisateur.component';
import { PageaccessService } from './pageaccess.service';
import { CarteAdminComponent } from './carte-admin/carte-admin.component';
import { CarteEmployerComponent } from './carte-employer/carte-employer.component';
import { FileEmployerComponent } from './file-employer/file-employer.component';


export const routes: Routes = [

    { path: 'newuser', component: NewuserComponent, canActivate: [PageaccessService]},
    
    {path: '', component:AppComponent},
    { path: 'login', component:LoginComponent, canActivate: [PageaccessService]},
    { path: 'admin-dashboard', component: AdminDashboardComponent},     
    { path: 'gest-utilisateurs', component: GestUtilisateursComponent, canActivate: [PageaccessService]},
    { path:'google-auth',component:GoogleAuthComponent},
    {path:'google-authvalide',component:GoogleAuthvalideComponent},
    {path:'espace-utilisateur',component:EspaceUtilisateurComponent},
    {path:'espace-employé',component:EspaceEmployerComponent},
    {path:'reclamation-utilisateur',component:ReclamationUtilisateurComponent},
    {path:'reclamation-admin',component:ReclamationAdminComponent, canActivate: [PageaccessService]},
    {path:'currency-utilisateur',component:CurrencyUtilisateurComponent},
    {path:'currency-administrateur',component:CurrencyAdminComponent, canActivate: [PageaccessService]},
    {path:'liste-reclamations',component:RecprogUtilisateurComponent},
    {path:'file-utilisateur',component:FileUtilisateurComponent},
    {path:'file-admin',component:FileAdminComponent, canActivate: [PageaccessService]},
    {path:'credit-admin',component:CreditAdminComponent, canActivate: [PageaccessService]},
    {path:'credit-utilisateur',component:CreditUtilisateurComponent},
    {path:'credit-sakan',component:CreditSakanComponent},  
    {path:'credit-sayara',component:CreditSayaraComponent}, 
    {path:'credit-awel-sakan',component:CreditAwelsakanComponent},
    {path:'credit-tahawel',component:CreditTahawelComponent},
    {path:'credit-renov',component:CreditRenovComponent},
    {path:'credit-mounassib',component:CreditMounassibComponent},
    {path:'credit-start',component:CreditStartComponent},
    {path:'credit-bien-etre',component:CreditBienetreComponent},
    {path:'rdv-utilisateur',component:RdvUtilisateurComponent},
    {path:'parametre-utilisateur',component:ParametreUtilisateurComponent},
    {path:'mdp-oublié',component:MdpoublieComponent},
    {path:'username-oublié',component:UsernameoublieUtilisateurComponent},
    {path:'mdpoublie-oublié',component:MdpoublieComponent},
    {path:'Carte-utilisateur',component:CarteUtilisateurComponent},
    { path:'Carte-admin',component:CarteAdminComponent},
    { path:'file-employer',component:FileEmployerComponent},
    { path:'carte-employer',component:CarteEmployerComponent},


    ]


export const appRouting = provideRouter(routes, withHashLocation()); 
