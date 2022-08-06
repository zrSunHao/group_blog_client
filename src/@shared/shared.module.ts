import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';

import { IconSnackBarComponent } from './cmpts/icon-snack-bar/icon-snack-bar.component';
import { ConfirmDialogComponent } from './cmpts/confirm-dialog/confirm-dialog.component';

import { ClipPipe } from './pipes/clip.pipe';
import { FileSizeFormatPipe } from './pipes/fileSizeFormat.pipe';

import { NotifyService } from './services/notify.service';

const mats = [MatButtonModule, MatDialogModule, MatSnackBarModule, MatDividerModule,];
const components = [IconSnackBarComponent, ConfirmDialogComponent,];
const services = [NotifyService];
const pipes = [ClipPipe,FileSizeFormatPipe];
const exports = [ConfirmDialogComponent,];

@NgModule({
  imports: [CommonModule, FormsModule,HttpClientModule, ...mats],
  declarations: [...components, ...pipes],
  providers: [...services,],
  exports: [...exports, ...pipes,HttpClientModule]
})
export class SharedModule { }
