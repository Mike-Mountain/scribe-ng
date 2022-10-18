import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from './components';
import {LayoutDirective} from './directives/layout.directive';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {RouterOutlet} from '@angular/router';
import {LandingComponent} from './components';
import {FeatureFilesModule} from "@ng-scribe/scribe/feature-files";
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
    imports: [CommonModule, MatIconModule, MatButtonModule, RouterOutlet, FeatureFilesModule, MatMenuModule],
  declarations: [LayoutComponent, LayoutDirective, LandingComponent],
  exports: [LayoutComponent],
})
export class FeatureLayoutModule {
}
