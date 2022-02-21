import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {BackgroundGalleryModalComponent} from "../background-gallery-modal/background-gallery-modal.component";
import {SettingsService} from "../../../../shared/services/settings.service";

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private modal: MatDialog, private settingsService: SettingsService) {
  }

  ngOnInit(): void {
  }

  onGalleryClick() {
    this.modal.open(BackgroundGalleryModalComponent).afterClosed()
      .subscribe(result => {
          if (result) {
            this.settingsService.updateBackground(result);
          }
        }
      );
  }
}
