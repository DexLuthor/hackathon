import {Component, OnDestroy, OnInit} from '@angular/core';
import {SettingsService} from "./shared/services/settings.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  bg: string;
  private subscription?: Subscription;

  constructor(private settingsService: SettingsService) {
    this.bg = localStorage.getItem('bg') ?? "../assets/images/bg/tree.jpg"; //todo fallback
    //todo hardcoded paths....
  }

  ngOnInit(): void {
    this.subscription = this.settingsService.$background.subscribe(bg => {
      this.bg = bg;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
