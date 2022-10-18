import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import {createLayout, Layout} from "./layout.model";

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'layout' })
export class LayoutStore extends Store<Layout> {

  constructor() {
    super(createLayout({}));
  }

}
