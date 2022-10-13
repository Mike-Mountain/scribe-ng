import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components';
import { LayoutDirective } from './directives/layout.directive';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  imports: [CommonModule, MatIconModule, MatButtonModule],
  declarations: [LayoutComponent, LayoutDirective],
})
export class ContainerFeatureLayoutModule {}
