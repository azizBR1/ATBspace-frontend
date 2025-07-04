import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServicedenavService {
  private avantUrl: string = '';
  private ceUrl: string = '';

  constructor(private router: Router) {
    this.ceUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.avantUrl = this.ceUrl;
        this.ceUrl = event.url;
      }
    });
  }
    public getpagePUrl(): string {
    return this.avantUrl;
  }
  }
