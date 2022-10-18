import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LandingComponent} from "@ng-scribe/container";
import {EditManuscriptComponent} from "@ng-scribe/scribe/feature-files";

const routes: Routes = [
  {
    path: 'landing',
    component: LandingComponent
  },
  {
    path: 'edit-manuscript',
    component: EditManuscriptComponent
  },
  {
    path: 'manuscript/:chapter/:scene',
    component: LandingComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/landing'
  }
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
