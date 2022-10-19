import { Injectable } from '@angular/core';
import { Tab } from './tab.model';
import { TabsStore } from './tabs.store';
import {Observable, of} from "rxjs";
import {Router} from "@angular/router";

@Injectable({ providedIn: 'root' })
export class TabsService {

  constructor(private tabsStore: TabsStore,
              private router: Router) {
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
    const tabId = tabs.findIndex(tab => tab.title === selectedTab.title);
    tabs.splice(tabId, 1);
    this.tabsStore._setState(tabs);
    if (selectedTab.isActive) {
      if (tabs.length > 0) {
        this.router.navigateByUrl(`manuscript/${tabs[0].path}`).then(() => tabs[0].isActive = true);
      } else {
        this.router.navigateByUrl('/');
      }
    }
  }

}
