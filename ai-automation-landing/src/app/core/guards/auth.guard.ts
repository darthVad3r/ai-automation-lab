import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

/**
 * Auth Guard placeholder
 * Protects routes that require authentication
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Add authentication logic here
    // Return true to allow navigation, false to block
    return true;
  }
}
