import {Injectable} from '@angular/core';
import {Chapter, Manuscript, Scene, ScribeService, Tab, TabsQuery, TabsService} from "@ng-scribe/scribe/data-access";
import {Router} from "@angular/router";
import {map, Observable, of} from "rxjs";
import {
  FormDialogComponent,
  FormDialogData,
  MessageDialogComponent,
  MessageDialogData
} from "@ng-scribe/shared/feature-ui";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class FileTreeService {

  constructor(private tabsQuery: TabsQuery,
              private tabsService: TabsService,
              private dialog: MatDialog,
              private scribeService: ScribeService) {
  }

  public routeToScene(scene: Scene, chapter: Chapter): Observable<Tab> {
    const tabs = this.tabsQuery.getValue();
    tabs.forEach(tab => tab.isActive = false);
    const tab: Tab = {
      isActive: true,
      title: `${chapter.title} - ${scene.title}`,
      icon: 'insert_drive_file',
      path: `${chapter.title.replace(' ', '-')}/${scene.title.replace(' ', '-')}`
    }
    const exists = tabs.find(item => item.title === tab.title);
    if (!exists) {
      return this.tabsService.setTab(tab).pipe(map(() => tab));
    } else {
      return of(tab);
    }
  }

  openCreateDialog<T extends Scene | Chapter>(): Observable<{ submitted: boolean, data: Pick<T, 'title'> }> {
    const data: FormDialogData<Pick<T, 'title'>> = {
      cancelButton: true,
      okayButton: true,
      formTitle: 'Create Scene',
      formData: {
        title: '',
      }
    }
    return this.dialog.open(FormDialogComponent, {data, width: '500px'}).afterClosed()
  }

  openConfirmDeleteDialog(type: 'chapter' | 'scene'): Observable<boolean> {
    const data: MessageDialogData = {
      icon: 'info',
      title: 'Delete',
      message: `Are you sure you want to delete this ${type}?`,
      buttons: {
        cancel: true,
        cancelText: 'No',
        action: true,
        actionText: 'Yes'
      }
    }
    if (type === 'chapter') {
      data.message += ' Note that any scenes belonging to this chapter will be deleted as well.'
    }
    return this.dialog.open(MessageDialogComponent, {data, width: '500px'}).afterClosed()
  }

  createChapter(chapterTitle: string, manuscript: Manuscript): Observable<Manuscript | undefined> {
    const chapter: Chapter = {
      title: chapterTitle,
      scenes: [],
      notes: [],
      isExpanded: true
    };
    if (!manuscript.chapters.find(item => item.title === chapter.title)) {
      manuscript.chapters.push(chapter);
      return this.scribeService.update('manuscript', manuscript).pipe(map(state => state.manuscript));
    } else {
      throw new Error('Chapter name must be unique!')
    }
  }

  createScene(chapter: Chapter, sceneTitle: string, manuscript: Manuscript): Observable<Manuscript | undefined> {
    const scene: Scene = {
      title: sceneTitle,
      notes: [],
      content: ''
    };
    if (!chapter.scenes.find(item => item.title === scene.title)) {
      chapter.scenes.push(scene);
      return this.scribeService.update('manuscript', manuscript).pipe(map(state => state.manuscript));
    } else {
      throw new Error('Scene name must be unique!')
    }
  }

  deleteScene(scene: Scene, chapter: Chapter, manuscript: Manuscript): Observable<Manuscript | undefined> {
    chapter.scenes = chapter.scenes.filter(item => item.title !== scene.title);
    return this.scribeService.update('manuscript', manuscript).pipe(map(state => state.manuscript));
  }

  deleteChapter(chapter: Chapter, manuscript: Manuscript): Observable<Manuscript | undefined> {
    manuscript.chapters = manuscript.chapters.filter(item => item.title !== chapter.title);
    return this.scribeService.update('manuscript', manuscript.chapters, 'chapters').pipe(map(state => state.manuscript));
  }
}
