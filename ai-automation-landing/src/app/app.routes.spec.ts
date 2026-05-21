import { Routes } from '@angular/router';
import { routes } from './app.routes';
import { LoginPageComponent } from './modules/login/login-page.component';
import { NotFoundPageComponent } from './modules/not-found/not-found-page.component';

describe('routes', () => {
  it('should map login route to the dedicated login component', async () => {
    const shellRoute = routes.find((route) => route.path === '');
    const childRoutes = shellRoute?.children as Routes | undefined;
    const loginRoute = childRoutes?.find((route) => route.path === 'login');

    expect(loginRoute).toBeDefined();
    expect(loginRoute?.redirectTo).toBeUndefined();

    const loadedComponent = await loginRoute?.loadComponent?.();

    expect(loadedComponent).toBe(LoginPageComponent);
  });

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
