import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import {Tab} from "./tab.model";

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tabs' })
export class TabsStore extends Store<Tab[]> {

  constructor() {
    super([]);
  }

}
