import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModalDialogIdService {
  createId(prefix = 'ui-dialog'): string {
    const cryptoApi = globalThis.crypto;

    if (cryptoApi && typeof cryptoApi.randomUUID === 'function') {
      return `${prefix}-${cryptoApi.randomUUID()}`;
    }

    return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  }
}
