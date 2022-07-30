import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';

import { SharedModule } from 'src/@shared/shared.module';

import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog.module.routing';

@NgModule({
  imports: [
    CommonModule,
    
    DragDropModule,
    MatIconModule,
    SharedModule,

    BlogRoutingModule
  ],
  declarations: [BlogComponent]
})
export class BlogModule { }
