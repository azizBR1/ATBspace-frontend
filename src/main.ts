import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { appRouting } from './app/app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';





  bootstrapApplication(AppComponent, {
    providers: [appRouting,provideHttpClient()]
  }).catch((err) => console.error(err));