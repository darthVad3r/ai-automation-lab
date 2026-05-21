import { Injectable } from '@angular/core';

import { AppStore } from '../../state/app.store';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private readonly appStore: AppStore) {}

  isAuthenticated(): boolean {
    return this.appStore.isAuthenticated();
  }
}
