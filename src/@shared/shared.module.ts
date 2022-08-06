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
import { JwtInterceptor } from './guard/jwt.interceptor';
import { ErrorInterceptor } from './guard/error.interceptor';

const mats = [MatButtonModule, MatDialogModule, MatSnackBarModule, MatDividerModule,];
const components = [IconSnackBarComponent, ConfirmDialogComponent,];
const services = [NotifyService];
const pipes = [ClipPipe, FileSizeFormatPipe];
const exports = [ConfirmDialogComponent,];

@NgModule({
  imports: [CommonModule, FormsModule, HttpClientModule, ...mats],
  declarations: [...components, ...pipes],
  providers: [...services,
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  exports: [...exports, ...pipes, HttpClientModule]
})
export class SharedModule { }
