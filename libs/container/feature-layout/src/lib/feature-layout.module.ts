import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from './components';
import {LayoutDirective} from './directives/layout.directive';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule, RouterOutlet} from '@angular/router';
import {LandingComponent} from './components';
import {FeatureFilesModule} from '@ng-scribe/scribe/feature-files';
import {MatMenuModule} from '@angular/material/menu';
import {TabsComponent} from './components/tabs/tabs.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterOutlet,
    FeatureFilesModule,
    MatMenuModule,
    RouterModule,
  ],
  declarations: [
    LayoutComponent,
    LayoutDirective,
    LandingComponent,
    TabsComponent,
  ],
  exports: [LayoutComponent],
})
export class FeatureLayoutModule {
}
