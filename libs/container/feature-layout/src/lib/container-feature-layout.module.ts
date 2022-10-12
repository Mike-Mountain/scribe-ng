import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components';
import { LayoutDirective } from './directives/layout.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [LayoutComponent, LayoutDirective],
})
export class ContainerFeatureLayoutModule {}
