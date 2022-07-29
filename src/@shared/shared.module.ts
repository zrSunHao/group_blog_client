import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';

import { PaginatorComponent } from './cmpts/paginator/paginator.component';
import { IconSnackBarComponent } from './cmpts/icon-snack-bar/icon-snack-bar.component';
import { ConfirmDialogComponent } from './cmpts/confirm-dialog/confirm-dialog.component';

import { NotifyService } from './services/notify.service';


const mats = [
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatButtonModule,
  MatSelectModule,
  MatDialogModule,
  MatSnackBarModule,
  MatDividerModule,];

const components = [PaginatorComponent, IconSnackBarComponent, ConfirmDialogComponent,];
const services = [NotifyService];
const exports = [PaginatorComponent, ConfirmDialogComponent,];

@NgModule({
  imports: [CommonModule, FormsModule, ...mats],
  declarations: [...components],
  providers: [...services,],
  exports: [...exports]
})
export class SharedModule { }
