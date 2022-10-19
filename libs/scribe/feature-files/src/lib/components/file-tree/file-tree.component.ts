import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  Chapter,
  Manuscript,
  Scene,
  ScribeQuery,
  ScribeService,
  Tab,
  TabsQuery,
  TabsService
} from "@ng-scribe/scribe/data-access";
import {map, Observable, ReplaySubject, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {
  FormDialogComponent,
  MessageDialogComponent,
  FormDialogData,
  MessageDialogData
} from "@ng-scribe/shared/feature-ui";

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

  public routeToScene(event: MouseEvent, scene: Scene, chapter: Chapter): void {
    event.stopImmediatePropagation();
    this.tabsQuery.getValue().forEach(tab => tab.isActive = false);
    const tab: Tab = {
      isActive: true,
      title: `${chapter.title} - ${scene.title}`,
      icon: 'insert_drive_file',
      path: `${chapter.title.replace(' ', '-')}/${scene.title.replace(' ', '-')}`
    }
    this.tabsService.setTab(tab).subscribe(() => {
      this.router.navigate([`manuscript/${tab.path}`])
    });
  }

  public openSceneDialog(chapter: Chapter): void {
    const data: FormDialogData<Pick<Scene, 'title'>> = {
      cancelButton: true,
      okayButton: true,
      formTitle: 'Create Scene',
      formData: {
        title: '',
      },
    }
    this.dialog.open(FormDialogComponent, {data, width: '500px'})
      .afterClosed()
      .pipe(takeUntil(this.$destroyed))
      .subscribe((data: { submitted: boolean, data: Pick<Scene, 'title'> }) => {
        if (data.submitted) {
          this.createScene(chapter, data.data.title)
        }
      });
  }

  public openDeleteConfirmDialog(event: MouseEvent, scene: Scene, chapter: Chapter): void {
    event.stopImmediatePropagation();
    const data: MessageDialogData = {
      icon: 'info',
      title: 'Delete',
      message: 'Are you sure you want to delete this scene?',
      buttons: {
        cancel: true,
        cancelText: 'No',
        action: true,
        actionText: 'Yes'
      }
    }
    this.dialog.open(MessageDialogComponent, {data, width: '500px'})
      .afterClosed()
      .pipe(takeUntil(this.$destroyed))
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.deleteScene(scene, chapter)
        }
      });
  }

  private createScene(chapter: Chapter, sceneTitle: string): void {
    const scene: Scene = {
      title: sceneTitle,
      notes: [],
      content: ''
    };
    if (!chapter.scenes.find(item => item.title === scene.title)) {
      chapter.scenes.push(scene);
      this.scribeService.update('manuscript', this.manuscript);
    } else {
      console.warn('SCENE NAME MUST BE UNIQUE')
    }
  }

  deleteScene(scene: Scene, chapter: Chapter) {
    chapter.scenes = chapter.scenes.filter(item => item.title !== scene.title);
    this.scribeService.update('manuscript', this.manuscript);
    // TODO: Route to the next scene
  }
}
