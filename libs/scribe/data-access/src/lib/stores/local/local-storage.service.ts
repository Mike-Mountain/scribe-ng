import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {ScribeState} from "../scribe/scribe.model";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storage = window.localStorage;

  constructor() {
  }

  getScribeData(): Observable<ScribeState> {
    const data = this.storage.getItem('scribe');
    if (data) {
      return of(JSON.parse(data));
    } else {
      return of(new ScribeState({}))
    }
  }

  setScribeData(data: ScribeState): Observable<ScribeState> {
    this.storage.setItem('scribe', JSON.stringify(data));
    return of(data);
  }
}
