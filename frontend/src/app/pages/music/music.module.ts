import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MusicRoutingModule} from './music-routing.module';
import {PlayerComponent} from './components/player/player.component';
import {TrackComponent} from './components/track/track.component';
import {MaterialModule} from "../../material.module";


@NgModule({
  declarations: [
    PlayerComponent,
    TrackComponent
  ],
  imports: [
    CommonModule,
    MusicRoutingModule,
    MaterialModule
  ],
  exports: [
    PlayerComponent
  ]
})
export class MusicModule {
}
