import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditorComponent} from "./components";
import {QuillEditorComponent} from "ngx-quill";

@NgModule({
  imports: [CommonModule, QuillEditorComponent],
  declarations: [EditorComponent],
  exports: [EditorComponent]
})
export class FeatureEditorModule {
}
