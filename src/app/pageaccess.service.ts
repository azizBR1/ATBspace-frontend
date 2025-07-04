import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class PageaccessService implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const from = sessionStorage.getItem('from');
    if(from){
          if (from === 'true') {

            sessionStorage.removeItem('from');
            return true;
          } else {

            this.router.navigate(['/login']);
            return false;
          }
    }
    else{

     return false;
     }
  }
}
