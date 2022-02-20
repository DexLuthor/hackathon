import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatMenuModule} from '@angular/material/menu';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    MatBottomSheetModule
  ],
  exports: [
    MatSidenavModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    MatBottomSheetModule
  ]
})
export class MaterialModule {
}
