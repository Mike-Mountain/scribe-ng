import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LayoutComponent} from "@ng-scribe/container";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {initialNavigation: 'enabledBlocking'}),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
