import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SettingsRoutingModule} from './settings-routing.module';
import {SettingsComponent} from './components/settings/settings.component';
import {MaterialModule} from "../../material.module";
import {
  BackgroundGalleryModalComponent
} from './components/background-gallery-modal/background-gallery-modal.component';


@NgModule({
  declarations: [
    SettingsComponent,
    BackgroundGalleryModalComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MaterialModule
  ],
  exports: [
    SettingsComponent
  ]
})
export class SettingsModule {
}
