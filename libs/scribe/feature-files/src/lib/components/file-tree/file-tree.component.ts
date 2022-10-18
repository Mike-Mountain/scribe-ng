import { Component, OnInit } from '@angular/core';
import {Chapter, Scene, ScribeQuery, Tab, TabsService} from "@ng-scribe/scribe/data-access";
import {map, Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'ng-scribe-file-tree',
  templateUrl: './file-tree.component.html',
  styleUrls: ['./file-tree.component.scss'],
})
export class FileTreeComponent implements OnInit {

  public files$: Observable<Chapter[]> | undefined;

  constructor(private scribeQuery: ScribeQuery,
              private tabsService: TabsService,
              private router: Router) {}

  ngOnInit(): void {
    this.files$ = this.scribeQuery.select('manuscript').pipe(
      map(manuscript => {
        console.log(manuscript);
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
}
