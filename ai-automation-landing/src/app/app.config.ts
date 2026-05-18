import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

/** Application-wide dependency provider configuration. */
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
