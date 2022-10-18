import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Chapter, Manuscript, Scene, ScribeService} from "@ng-scribe/scribe/data-access";
import {LayoutService} from "@ng-scribe/shared/data-access";

@Component({
  selector: 'ng-scribe-manuscript-details',
  templateUrl: './manuscript-details.component.html',
  styleUrls: ['./manuscript-details.component.scss'],
})
export class ManuscriptDetailsComponent implements OnInit {

  public isCreating = false;
  public manuscriptForm: FormGroup | undefined;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private scribeService: ScribeService,
              private layoutService: LayoutService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['create']) {
        this.isCreating = true;
        this.manuscriptForm = this.formBuilder.group({
          title: ['', Validators.required],
          author: ['', Validators.required],
          synopsis: [''],
        })
      }
    });
  }

  createManuscript() {
    // if (this.manuscriptForm?.valid) {
    //   const manuscript: Manuscript = {...this.manuscriptForm?.value};
    //   const scene: Scene = {
    //     title: 'Scene One',
    //     content: '',
    //     notes: []
    //   }
    //   const chapter: Chapter = {
    //     title: 'Chapter One',
    //     isExpanded: false,
    //     scenes: [scene],
    //     notes: []
    //   }
    //   manuscript.chapters = [chapter];
    //   this.scribeService.update('manuscript', manuscript).subscribe(() => this.layoutService.togglePanel('contentLeft'));
    // }
  }
}
