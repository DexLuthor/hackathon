import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'background-gallery-modal',
  templateUrl: './background-gallery-modal.component.html',
  styleUrls: ['./background-gallery-modal.component.scss']
})
export class BackgroundGalleryModalComponent {

  readonly images = [
    "assets/images/bg/astronaut.jpg",
    "assets/images/bg/circle.jpg",
    "assets/images/bg/dear.jpg",
    "assets/images/bg/megapolis.jpg",
    "assets/images/bg/moon.jpg",
    "assets/images/bg/skyscrappers.jpg",
    "assets/images/bg/tree.jpg"
  ]

  constructor(private dialogRef: MatDialogRef<BackgroundGalleryModalComponent>) {
  }

  onBackgroundClick(img: string) {
    this.dialogRef.close(img);
  }
}
