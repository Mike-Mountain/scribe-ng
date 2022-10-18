import { Injectable } from '@angular/core';
import { LayoutStore } from './layout.store';
import {Layout} from "./layout.model";

@Injectable({ providedIn: 'root' })
export class LayoutService {

  constructor(private layoutStore: LayoutStore) {
  }

  togglePanel(panel: string) {
    const state = JSON.parse(JSON.stringify(this.layoutStore.getValue()));
    if (state[panel as keyof Layout] === 'open') {
      state[panel as keyof Layout] = 'closed'
    } else {
      state[panel as keyof Layout] = 'open'
    }
    this.layoutStore.update(state);
  }

}
