import { Component, OnInit } from '@angular/core';
import {Chapter, Scene, ScribeQuery} from "@ng-scribe/scribe/data-access";
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

  routeToScene(event: MouseEvent) {
    event.stopImmediatePropagation();
    this.router.navigate(['/'])
  }
}
