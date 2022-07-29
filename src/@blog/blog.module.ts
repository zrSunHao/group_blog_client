import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';

import { SunEditorModule } from 'src/@cmpts/sun-editor/sun-editor.module';

import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog.module.routing';
import { SharedModule } from 'src/@shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    DragDropModule,
    MatIconModule,

    SunEditorModule,
    SharedModule,

    BlogRoutingModule
  ],
  declarations: [BlogComponent]
})
export class BlogModule { }
