import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { SharedModule } from 'src/@shared/shared.module';
import { NoteItemModule } from 'src/@cmpts/note-item/note-item.module';
import { PaginatorModule } from 'src/@cmpts/paginator/paginator.module';

import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog.module.routing';

const mats = [MatInputModule, MatFormFieldModule, MatButtonModule, MatMenuModule, MatIconModule,];
const cmpts = [NoteItemModule, PaginatorModule,];

@NgModule({
  imports: [
    CommonModule,
    ...mats,
    ...cmpts,
    SharedModule,
    BlogRoutingModule
  ],
  declarations: [BlogComponent]
})
export class BlogModule { }
