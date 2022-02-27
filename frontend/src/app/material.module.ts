import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatMenuModule} from '@angular/material/menu';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    MatBottomSheetModule,
    MatGridListModule,
    MatChipsModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  exports: [
    MatSidenavModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    MatBottomSheetModule,
    MatGridListModule,
    MatChipsModule,
    MatButtonModule,
    MatCheckboxModule
  ]
})
export class MaterialModule {
}
