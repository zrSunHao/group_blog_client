import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';

import { IconSnackBarComponent } from './cmpts/icon-snack-bar/icon-snack-bar.component';
import { ConfirmDialogComponent } from './cmpts/confirm-dialog/confirm-dialog.component';

import { NotifyService } from './services/notify.service';


const mats = [
  MatButtonModule,
  MatDialogModule,
  MatSnackBarModule,
  MatDividerModule,];

const components = [IconSnackBarComponent, ConfirmDialogComponent,];
const services = [NotifyService];
const exports = [ConfirmDialogComponent,];

@NgModule({
  imports: [CommonModule, FormsModule, ...mats],
  declarations: [...components],
  providers: [...services,],
  exports: [...exports]
})
export class SharedModule { }
