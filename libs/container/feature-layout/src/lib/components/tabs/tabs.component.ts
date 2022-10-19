import {Component, Input, OnInit} from '@angular/core';
import {Tab, TabsQuery, TabsService} from "@ng-scribe/scribe/data-access";
import {Router} from "@angular/router";

@Component({
  selector: 'ng-scribe-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {

  @Input() tabs: Tab[] = [];

  constructor(private tabsService: TabsService,
              private tabsQuery: TabsQuery,
              private router: Router) {}

  ngOnInit(): void {
  }

  removeTab(event: MouseEvent, tab: Tab) {
    event.stopImmediatePropagation();
    this.tabsService.removeTab(tab);
  }

  routeToTab(tab: Tab) {
    this.tabsQuery.getValue().forEach(tab => tab.isActive = false);
    tab.isActive = true;
    this.router.navigateByUrl(`manuscript/${tab.path}`);
  }
}
