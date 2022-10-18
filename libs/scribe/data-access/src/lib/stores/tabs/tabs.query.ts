import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { TabsStore } from './tabs.store';
import {Tab} from "./tab.model";

@Injectable({ providedIn: 'root' })
export class TabsQuery extends Query<Tab[]> {

  constructor(override store: TabsStore) {
    super(store);
  }

}
