import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  readonly audio = new Audio();
  private readonly tracks: string[]
  private activeIndex: number;

  constructor() {
    this.tracks = [
      "assets/sounds/ADDi - Tori 鳥.mp3",
      "assets/sounds/DEATHWISH - 酔った侍.mp3"
    ];
    this.activeIndex = 0;
  }

  ngOnInit(): void {
    this.loadSong();
  }

  next() {
    if (++this.activeIndex > this.tracks.length) {
      this.loadSong();
      this.activeIndex = 0;
    }
  }

  startStop() {
    if (this.audio.paused) {
      this.audio.play().then()
    } else {
      this.audio.pause();
    }
  }

  prev() {
    if (--this.activeIndex < 0) {
      this.loadSong();
      this.activeIndex = this.tracks.length - 1;
    }
  }

  private loadSong() {
    this.audio.src = this.tracks[this.activeIndex];
    this.audio.load();
  }
}
