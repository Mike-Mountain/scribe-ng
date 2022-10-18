import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {LayoutQuery} from "../../../../../../shared/data-access/src/lib/store/layout/layout.query";
import {Observable, ReplaySubject, tap} from "rxjs";
import {Layout} from "../../../../../../shared/data-access/src/lib/store/layout/layout.model";
import {LayoutService} from "../../../../../../shared/data-access/src/lib/store/layout/layout.service";
import {ScribeQuery, ScribeService, ScribeState, Tab, TabsQuery} from "@ng-scribe/scribe/data-access";

@Component({
  selector: 'ng-scribe-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  public layout$: Observable<Layout> | undefined;
  public scribeData$: Observable<ScribeState> | undefined;
  public tabs$: Observable<Tab[]> | undefined;
  private destroyed$ = new ReplaySubject(1);

  constructor(private layoutQuery: LayoutQuery,
              private layoutService: LayoutService,
              private scribeQuery: ScribeQuery,
              private tabsQuery: TabsQuery,
              private scribeService: ScribeService) {
  }

  ngOnInit(): void {
    this.layout$ = this.layoutQuery.select();
    this.tabs$ = this.tabsQuery.select();
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

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  togglePanel(panel: string) {
    this.layoutService.togglePanel(panel);
  }
}
