import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { SharedModule } from 'src/@shared/shared.module';
import { NoteItemModule } from 'src/@cmpts/note-item/note-item.module';
import { PaginatorModule } from 'src/@cmpts/paginator/paginator.module';

import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog.module.routing';
import { BlogService } from './blog.service';
import { DialogNoteToColumnComponent } from './dialog-note-to-column/dialog-note-to-column.component';

const mats = [MatInputModule, MatFormFieldModule, MatButtonModule, MatMenuModule, MatIconModule, MatSelectModule,];
const cmpts = [NoteItemModule, PaginatorModule,];

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    ...mats,
    ...cmpts,
    SharedModule,
    BlogRoutingModule
  ],
  declarations: [BlogComponent, DialogNoteToColumnComponent],
  providers: [BlogService]
})
export class BlogModule { }
