import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SnackBarService} from "../../../../shared/services/snack-bar.service";

@Component({
  selector: 'chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class ChipComponent {

  @Input() mode: 'add' | 'view' = 'view'

  @Input() active: boolean | undefined
  @Output() onClick = new EventEmitter<boolean>()
  @Output() onChipAdded = new EventEmitter<string>()

  chipName = "";

  constructor(private snackbarService: SnackBarService) {
  }

  addChip() {
    if (this.chipName.length > 0) {
      this.onChipAdded.emit(this.chipName);
      this.chipName = "";
    } else {
      this.snackbarService.openSnackBar("Too short tag");
    }
  }

  onChipClicked() {
    this.active = !this.active;
    this.onClick.emit(this.active);
  }
}
