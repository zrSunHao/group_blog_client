import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { NoteItemComponent } from './note-item.component';

const mats = [MatTooltipModule, MatIconModule, MatButtonModule, MatMenuModule];

@NgModule({
  imports: [
    CommonModule,
    ...mats
  ],
  exports: [NoteItemComponent],
  declarations: [NoteItemComponent]
})
export class NoteItemModule { }
