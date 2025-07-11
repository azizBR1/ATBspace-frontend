import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
//import { authinterceptorInterceptor } from './authinterceptor.interceptor';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient()
  ]
};
