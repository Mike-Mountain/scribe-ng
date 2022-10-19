import {Component, OnDestroy, OnInit} from '@angular/core';
import {LayoutQuery, LayoutService, Layout} from "@ng-scribe/shared/data-access";
import {Observable, ReplaySubject, take, tap} from "rxjs";
import {ScribeQuery, ScribeService, ScribeState, Tab, TabsQuery, TabsService} from "@ng-scribe/scribe/data-access";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'ng-scribe-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  public layout$: Observable<Layout> | undefined;
  public scribeData$: Observable<ScribeState> | undefined;
  public tabs$: Observable<Tab[]> | undefined;
  private destroyed$ = new ReplaySubject(1);

  constructor(private layoutQuery: LayoutQuery,
              private layoutService: LayoutService,
              private scribeQuery: ScribeQuery,
              private tabsQuery: TabsQuery,
              private tabsService: TabsService,
              private router: Router,
              private route: ActivatedRoute,
              private scribeService: ScribeService) {
  }

  ngOnInit(): void {
    this.layout$ = this.layoutQuery.select();
    this.tabs$ = this.tabsQuery.select();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects.substring(1, 11) === 'manuscript') {
          let url = event.urlAfterRedirects.substring(12);
          const titlePart1 = url.substring(0, url.indexOf('/')).replace('-', ' ');
          const titlePart2 = url.substring(titlePart1.length + 1, url.length).replace('-', ' ');
          const tab: Tab = {
            path: `${titlePart1.replace(' ', '-')}/${titlePart2.replace(' ', '-')}`,
            title: `${titlePart1} - ${titlePart2}`,
            isActive: true,
            icon: 'insert_drive_file'
          };
          this.tabsService.setTab(tab);
        }
      }
    })
    if (!this.scribeQuery.getHasCache()) {
      this.scribeService.getScribeData().subscribe();
    }
    this.scribeData$ = this.scribeQuery.select().pipe(
      tap(data => {
        // Open the manuscript by default if one exists
        if (data.manuscript) {
          this.layoutService.togglePanel('contentLeft');
        }
      })
    );
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  togglePanel(panel: string) {
    this.layoutService.togglePanel(panel);
  }

  createChapter() {

  }

  createScene() {

  }
}
