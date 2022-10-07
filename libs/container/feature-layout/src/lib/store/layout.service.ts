import { Injectable } from '@angular/core';
import { LayoutStore } from './layout.store';
import {Layout} from "./layout.model";

@Injectable({ providedIn: 'root' })
export class LayoutService {

  constructor(private layoutStore: LayoutStore) {
  }

  togglePanel(panel: string, isOpen: boolean) {
    const state = JSON.parse(JSON.stringify(this.layoutStore.getValue()));
    state[panel as keyof Layout] = isOpen;
    this.layoutStore.update(state);
  }

}
