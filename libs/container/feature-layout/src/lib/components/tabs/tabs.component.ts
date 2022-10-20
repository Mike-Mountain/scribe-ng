import {Component, Input, OnInit} from '@angular/core';
import {Tab, TabsQuery, TabsService} from "@ng-scribe/scribe/data-access";
import {Router} from "@angular/router";
import {Observable, take} from "rxjs";

@Component({
  selector: 'ng-scribe-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {

  @Input() tabs: Observable<Tab[]> | undefined;

  constructor(private tabsService: TabsService,
              private tabsQuery: TabsQuery,
              private router: Router) {}

  ngOnInit(): void {
  }

  removeTab(event: MouseEvent, tab: Tab) {
    event.stopImmediatePropagation();
    this.tabsService.removeTab(tab).pipe(take(1)).subscribe(tabs => {
      if (tab.isActive) {
        if (tabs.length > 0) {
          tabs[0].isActive = true;
          this.router.navigateByUrl(`manuscript/${tabs[0].path}`);
        } else {
          this.router.navigateByUrl('/');
        }
      }
    });
  }

  routeToTab(tab: Tab) {
    this.tabsQuery.getValue().forEach(tab => tab.isActive = false);
    tab.isActive = true;
    this.router.navigateByUrl(`manuscript/${tab.path}`);
  }
}
