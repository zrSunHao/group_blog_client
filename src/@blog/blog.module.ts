import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { SharedModule } from 'src/@shared/shared.module';

import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog.module.routing';

const mats = [DragDropModule, MatButtonModule, MatMenuModule, MatIconModule,];

@NgModule({
  imports: [
    CommonModule,
    ...mats,
    SharedModule,
    BlogRoutingModule
  ],
  declarations: [BlogComponent]
})
export class BlogModule { }
