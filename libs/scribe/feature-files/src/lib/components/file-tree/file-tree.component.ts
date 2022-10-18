import { Component, OnInit } from '@angular/core';
import {Chapter, Manuscript, Scene, ScribeQuery, ScribeService, Tab, TabsService} from "@ng-scribe/scribe/data-access";
import {map, Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'ng-scribe-file-tree',
  templateUrl: './file-tree.component.html',
  styleUrls: ['./file-tree.component.scss'],
})
export class FileTreeComponent implements OnInit {

  public files$: Observable<Chapter[]> | undefined;
  public manuscript: Manuscript | undefined;

  constructor(private scribeQuery: ScribeQuery,
              private scribeService: ScribeService,
              private tabsService: TabsService,
              private router: Router) {}

  ngOnInit(): void {
    this.files$ = this.scribeQuery.select('manuscript').pipe(
      map(manuscript => {
        this.manuscript = manuscript;
        return manuscript?.chapters || []
      })
    )
  }

  toggleChapter(chapter: Chapter) {
    chapter.isExpanded = !chapter.isExpanded;
  }

  routeToScene(event: MouseEvent, scene: Scene, chapter: Chapter) {
    event.stopImmediatePropagation();
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

  createScene(chapter: Chapter) {
    const scene: Scene = {
      title: 'New Scene',
      notes: [],
      content: ''
    };
    if (!chapter.scenes.find(item => item.title === scene.title)) {
      chapter.scenes.push(scene);
      console.log(this.manuscript?.chapters);
      this.scribeService.update('manuscript', this.manuscript);
    } else {
      console.warn('SCENE NAME MUST BE UNIQUE')
    }
  }
}
