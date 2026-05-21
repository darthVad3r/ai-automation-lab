import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AppStore } from './state/app.store';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), AppStore],
};
