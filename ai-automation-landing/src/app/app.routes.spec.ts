import { Routes } from '@angular/router';
import { routes } from './app.routes';
import { NotFoundPageComponent } from './modules/not-found/not-found-page.component';

describe('routes', () => {
  it('should map wildcard route to the dedicated not-found component', async () => {
    const shellRoute = routes.find((route) => route.path === '');
    const childRoutes = shellRoute?.children as Routes | undefined;
    const wildcardRoute = childRoutes?.find((route) => route.path === '**');

    expect(wildcardRoute).toBeDefined();
    expect(wildcardRoute?.redirectTo).toBeUndefined();

    const loadedComponent = await wildcardRoute?.loadComponent?.();

    expect(loadedComponent).toBe(NotFoundPageComponent);
  });
});
