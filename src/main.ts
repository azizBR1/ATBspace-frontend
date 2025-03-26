import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { appRouting } from './app/app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
//import { authinterceptorInterceptor } from './app/authinterceptor.interceptor';




  bootstrapApplication(AppComponent, {
    providers: [appRouting,provideHttpClient()]
  }).catch((err) => console.error(err));