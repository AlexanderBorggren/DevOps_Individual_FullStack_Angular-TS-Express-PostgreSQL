import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './todo-app/app.config';
import { AppComponent } from './todo-app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
