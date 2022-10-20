import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  Chapter,
  Manuscript,
  Scene,
  ScribeQuery,
  ScribeService,
  TabsQuery,
  TabsService
} from "@ng-scribe/scribe/data-access";
import {map, Observable, ReplaySubject, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {LayoutService} from "@ng-scribe/shared/data-access";
import {FileTreeService} from "../../services";

@Component({
  selector: 'ng-scribe-file-tree',
  templateUrl: './file-tree.component.html',
  styleUrls: ['./file-tree.component.scss'],
})
export class FileTreeComponent implements OnInit, OnDestroy {

  public files$: Observable<Chapter[]> | undefined;
  public manuscript: Manuscript | undefined;
  private $destroyed = new ReplaySubject<boolean>(1);

  constructor(private scribeQuery: ScribeQuery,
              private scribeService: ScribeService,
              private tabsService: TabsService,
              private tabsQuery: TabsQuery,
              private layoutService: LayoutService,
              private fileTreeService: FileTreeService,
              private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit(): void {
    this.files$ = this.scribeQuery.select('manuscript').pipe(
      map(manuscript => {
        this.manuscript = manuscript;
        return manuscript?.chapters || []
      })
    )
  }

  ngOnDestroy(): void {
    this.$destroyed.next(true);
    this.$destroyed.complete();
  }

  public toggleChapter(chapter: Chapter): void {
    chapter.isExpanded = !chapter.isExpanded;
  }

  togglePanel(panel: string) {
    this.layoutService.togglePanel(panel);
  }

  public routeToScene(event: MouseEvent, scene: Scene, chapter: Chapter): void {
    event.stopImmediatePropagation();
    this.fileTreeService.routeToScene(scene, chapter)
      .pipe(takeUntil(this.$destroyed))
      .subscribe((tab) => this.router.navigate([`manuscript/${tab.path}`]));
  }

  public openSceneDialog(chapter: Chapter): void {
    this.fileTreeService.openSceneDialog()
      .pipe(takeUntil(this.$destroyed))
      .subscribe((data: { submitted: boolean, data: Pick<Scene, 'title'> }) => {
        if (data.submitted) {
          this.createScene(chapter, data.data.title)
        }
      });
  }

  public openDeleteConfirmDialog(event: MouseEvent, scene: Scene, chapter: Chapter): void {
    event.stopImmediatePropagation();
    this.fileTreeService.openConfirmDeleteDialog()
      .pipe(takeUntil(this.$destroyed))
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.deleteScene(scene, chapter)
        }
      });
  }

  private createScene(chapter: Chapter, sceneTitle: string): void {
    if (this.manuscript) {
      this.fileTreeService.createScene(chapter, sceneTitle, this.manuscript)
        .pipe(takeUntil(this.$destroyed))
        .subscribe((manuscript) => console.log('Manuscript updated:', manuscript))
    }
  }

  private deleteScene(scene: Scene, chapter: Chapter) {
    if (this.manuscript) {
      this.fileTreeService.deleteScene(scene, chapter, this.manuscript)
        .pipe(takeUntil(this.$destroyed))
        .subscribe((manuscript) => console.log('Scene deleted:', manuscript))
    }
  }
}
