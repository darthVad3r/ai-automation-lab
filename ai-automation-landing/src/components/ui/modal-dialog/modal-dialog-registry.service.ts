import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModalDialogRegistryService {
  private readonly openIds: string[] = [];

  register(id: string): void {
    if (!this.openIds.includes(id)) {
      this.openIds.push(id);
    }
  }

  unregister(id: string): void {
    const idx = this.openIds.indexOf(id);

    if (idx !== -1) {
      this.openIds.splice(idx, 1);
    }
  }

  isTopMost(id: string): boolean {
    return this.openIds.at(-1) === id;
  }
}
