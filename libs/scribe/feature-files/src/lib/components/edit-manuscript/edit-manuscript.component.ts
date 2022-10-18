import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Chapter, Manuscript, Scene, ScribeQuery, ScribeService} from "@ng-scribe/scribe/data-access";
import {LayoutService} from "@ng-scribe/shared/data-access";
import {map, Observable, tap} from "rxjs";

@Component({
  selector: 'ng-scribe-edit-manuscript',
  templateUrl: './edit-manuscript.component.html',
  styleUrls: ['./edit-manuscript.component.scss'],
})
export class EditManuscriptComponent implements OnInit {
  public isCreating = false;
  public manuscriptForm$: Observable<FormGroup> | undefined;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private scribeService: ScribeService,
              private scribeQuery: ScribeQuery,
              private layoutService: LayoutService) {
  }

  ngOnInit(): void {
    this.manuscriptForm$ = this.scribeQuery.select().pipe(
      map(data => {
        if (!data.manuscript) {
          this.isCreating = true;
        }
        return this.createManuscriptForm(data.manuscript);
      })
    )
  }

  createManuscriptForm(manuscript?: Manuscript): FormGroup {
    return this.formBuilder.group({
      title: [manuscript?.title || '', Validators.required],
      author: [manuscript?.author || '', Validators.required],
      synopsis: [manuscript?.synopsis || ''],
    })
  }

  createManuscript(form: FormGroup) {
    if (form.valid) {
      const manuscript: Manuscript = {...form.value};
      const scene: Scene = {
        title: 'Scene One',
        content: '',
        notes: []
      }
      const chapter: Chapter = {
        title: 'Chapter One',
        isExpanded: false,
        scenes: [scene],
        notes: []
      }
      manuscript.chapters = [chapter];
      this.scribeService.update('manuscript', manuscript).subscribe(() => {
        this.router.navigate(['/']).then(() => this.layoutService.togglePanel('contentLeft'))
      });
    }
  }
}
