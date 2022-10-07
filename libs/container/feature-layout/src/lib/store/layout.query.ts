import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { LayoutStore } from './layout.store';
import {Layout} from "./layout.model";

@Injectable({ providedIn: 'root' })
export class LayoutQuery extends Query<Layout> {

  constructor(override store: LayoutStore) {
    super(store);
  }

}
