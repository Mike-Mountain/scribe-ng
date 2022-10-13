import {Injectable} from '@angular/core';
import {ScribeStore} from './scribe.store';
import {LocalStorageService} from "../local/local-storage.service";
import {Observable, tap} from "rxjs";
import {ScribeState} from "./scribe.model";

@Injectable({providedIn: 'root'})
export class ScribeService {

  constructor(private scribeStore: ScribeStore,
              private localStorageService: LocalStorageService) {
  }

  getScribeData(): Observable<ScribeState> {
    return this.localStorageService.getScribeData().pipe(
      tap(data => this.scribeStore.update(data))
    )
  }

  setScribeData(data: ScribeState): Observable<ScribeState> {
    return this.localStorageService.setScribeData(data).pipe(
      tap(data => this.scribeStore.update(data))
    );
  }

  update(key: string, updateBody: any): Observable<ScribeState> {
    const data: ScribeState = JSON.parse(JSON.stringify(this.scribeStore.getValue()));
    data[key as keyof ScribeState] = updateBody;
    return this.localStorageService.setScribeData(data).pipe(
      tap(data => this.scribeStore.update(data))
    )
  }

}
