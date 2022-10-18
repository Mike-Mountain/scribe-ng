import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditManuscriptComponent, FileTreeComponent, ManuscriptDetailsComponent} from './components';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        RouterLink,
        MatIconModule,
        MatMenuModule,
    ],
  declarations: [
    ManuscriptDetailsComponent,
    FileTreeComponent,
    EditManuscriptComponent,
  ],
  exports: [FileTreeComponent, ManuscriptDetailsComponent, EditManuscriptComponent],
})
export class FeatureFilesModule {
}
