import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private _snackBar: MatSnackBar) {
  }

  public openSnackBarWithAction(message: string, action: string | undefined) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  public openSnackBar(message: string) {
    this.openSnackBarWithAction(message, undefined)
  }
}
