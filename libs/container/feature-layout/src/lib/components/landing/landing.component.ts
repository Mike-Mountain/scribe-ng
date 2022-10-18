import { Component, OnInit } from '@angular/core';
import {ScribeQuery, ScribeState} from "@ng-scribe/scribe/data-access";
import {Observable, tap} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'ng-scribe-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  public scribeData: Observable<ScribeState> | undefined;
  constructor(private scribeQuery: ScribeQuery,
              private router: Router) {}

  ngOnInit(): void {
    this.scribeData = this.scribeQuery.select().pipe(
      tap(data => {
        if (data.manuscript) {
          this.router.navigate(['/manuscript/chapter-one/scene-one'])
        }
      })
    );
  }

  createManuscript() {
    this.router.navigate(['/edit-manuscript'])
  }
}
