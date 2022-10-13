import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import {LayoutQuery} from "../../store/layout.query";
import {Observable, ReplaySubject, takeUntil, tap} from "rxjs";
import {Layout} from "../../store/layout.model";
import {LayoutService} from "../../store/layout.service";
import {ScribeQuery} from "../../../../../../scribe/data-access/src/lib/stores/scribe/scribe.query";
import {ScribeService} from "../../../../../../scribe/data-access/src/lib/stores/scribe/scribe.service";
import {ScribeState} from "../../../../../../scribe/data-access/src/lib/stores/scribe/scribe.model";

@Component({
  selector: 'ng-scribe-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  public layout$: Observable<Layout> | undefined;
  public scribeData$: Observable<ScribeState> | undefined;
  private destroyed$ = new ReplaySubject(1);

  constructor(private layoutQuery: LayoutQuery,
              private layoutService: LayoutService,
              private scribeQuery: ScribeQuery,
              private scribeService: ScribeService) {
  }

  ngOnInit(): void {
    this.layout$ = this.layoutQuery.select();
    if (!this.scribeQuery.getHasCache()) {
      this.scribeService.getScribeData().subscribe();
    }
    this.scribeData$ = this.scribeQuery.select().pipe(
      tap(data => {
        // Open the manuscript by default if one exists
        if (data.manuscript) {
          this.layoutService.togglePanel('contentRight');
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
