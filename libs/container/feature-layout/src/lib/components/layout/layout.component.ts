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
import {Observable, ReplaySubject, takeUntil} from "rxjs";
import {Layout} from "../../store/layout.model";
import {LayoutService} from "../../store/layout.service";

@Component({
  selector: 'ng-scribe-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  // @ViewChild('layout')
  // private layout: ElementRef | undefined;

  public layout$: Observable<Layout> | undefined;
  private destroyed$ = new ReplaySubject(1);

  constructor(private layoutQuery: LayoutQuery,
              private layoutService: LayoutService,
              private renderer: Renderer2) {}

  ngOnInit(): void {
    this.layout$ = this.layoutQuery.select();
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  togglePanel(bottomPanel: string, isOpen: boolean) {
    this.layoutService.togglePanel(bottomPanel, isOpen);
  }
}
