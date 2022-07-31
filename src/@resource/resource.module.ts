import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { SharedModule } from 'src/@shared/shared.module';
import { PaginatorModule } from 'src/@cmpts/paginator/paginator.module';

import { ResourceComponent } from './resource.component';
import { ResourceRoutingModule } from './resource.module.routing';

const mats = [
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatButtonModule,
  MatSelectModule,
  MatTableModule,
  MatTooltipModule,
  MatDialogModule,
  MatDatepickerModule,];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...mats,
    PaginatorModule,
    SharedModule,
    ResourceRoutingModule
  ],
  declarations: [ResourceComponent]
})
export class ResourceModule { }
