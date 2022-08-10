import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { SharedModule } from 'src/@shared/shared.module';

import { ColumnItemModule } from 'src/@cmpts/column-item/column-item.module';
import { NoteItemModule } from 'src/@cmpts/note-item/note-item.module';

import { StarComponent } from './star.component';
import { StarRoutingModule } from './star.module.routing';
import { StarService } from './star.service';
import { DialogColumnComponent } from './dialog-column/dialog-column.component';

const mats = [DragDropModule, MatButtonModule, MatMenuModule, MatIconModule, MatFormFieldModule, MatInputModule];
const shareds = [SharedModule, NoteItemModule, ColumnItemModule];

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    ...mats, ...shareds,
    StarRoutingModule
  ],
  declarations: [StarComponent, DialogColumnComponent],
  providers: [StarService]
})
export class StarModule { }
