import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  get isLoading(): BehaviorSubject<boolean> {
    return this._isLoading;
  }
}
