import { Injectable } from '@angular/core';
import { Tab } from './tab.model';
import { TabsStore } from './tabs.store';
import {Observable, of} from "rxjs";

@Injectable({ providedIn: 'root' })
export class TabsService {

  constructor(private tabsStore: TabsStore) {
  }

  setTab(newTab: Tab): Observable<Tab[]> {
    const tabs: Tab[] = JSON.parse(JSON.stringify(this.tabsStore.getValue()));
    const exists = tabs.find(tab => tab.title === newTab.title);
    if (!exists) {
      tabs.push(newTab);
    }
    this.tabsStore._setState(tabs);
    return of(tabs);
  }

  removeTab(selectedTab: Tab) {
    const tabs: Tab[] = JSON.parse(JSON.stringify(this.tabsStore.getValue()));
    const newTabs = tabs.filter(tab => tab.title !== selectedTab.title);
    this.tabsStore._setState(newTabs);
  }

}
