import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { ScribeStore } from './scribe.store';
import {ScribeState} from "./scribe.model";

@Injectable({ providedIn: 'root' })
export class ScribeQuery extends Query<ScribeState> {

  constructor(override store: ScribeStore) {
    super(store);
  }

}
