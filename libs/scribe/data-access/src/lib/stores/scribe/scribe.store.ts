import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import {ScribeState} from "./scribe.model";

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'scribe' })
export class ScribeStore extends Store<ScribeState> {

  constructor() {
    super(new ScribeState({}));
  }

}
