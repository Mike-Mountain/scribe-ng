import {Component, Input, OnInit} from '@angular/core';
import {Tab, TabsService} from "@ng-scribe/scribe/data-access";

@Component({
  selector: 'ng-scribe-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {

  @Input() tabs: Tab[] = [];

  constructor(private tabsService: TabsService) {}

  ngOnInit(): void {
  }

  removeTab(event: MouseEvent, tab: Tab) {
    event.stopImmediatePropagation();
    this.tabsService.removeTab(tab);
  }
}
