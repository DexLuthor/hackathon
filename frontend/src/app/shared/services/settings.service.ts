import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  $background = new Subject<string>()

  public updateBackground(background: string): void {
    this.$background.next(background);
    localStorage.setItem('bg', background)
  }
}
