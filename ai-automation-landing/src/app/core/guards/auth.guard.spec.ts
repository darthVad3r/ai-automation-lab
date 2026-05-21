import { Router, UrlTree } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authService: AuthService;
  let router: Router;
  let guard: AuthGuard;
  let loginUrlTree: UrlTree;
  let isAuthenticated = false;
  let createUrlTreeCalls: unknown[][] = [];

  beforeEach(() => {
    isAuthenticated = false;
    createUrlTreeCalls = [];
    loginUrlTree = {} as UrlTree;

    authService = {
      isAuthenticated: () => isAuthenticated,
    } as AuthService;

    router = {
      createUrlTree: (...commands: unknown[]) => {
        createUrlTreeCalls.push(commands);
        return loginUrlTree;
      },
    } as unknown as Router;

    guard = new AuthGuard(authService, router);
  });

  it('should allow navigation when authenticated', () => {
    isAuthenticated = true;

    const result = guard.canActivate();

    expect(result).toBe(true);
    expect(createUrlTreeCalls).toEqual([]);
  });

  it('should redirect to /login when unauthenticated', () => {
    isAuthenticated = false;

    const result = guard.canActivate();

    expect(createUrlTreeCalls).toEqual([[['/login']]]);
    expect(result).toBe(loginUrlTree);
  });
});
