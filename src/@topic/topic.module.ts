import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';

import { EditorModule } from 'src/@cmpts/editor/editor.module';
import { SharedModule } from 'src/@shared/shared.module';

import { TopicComponent } from './topic.component';
import { TopicRoutingModule } from './topic.module.routing';

@NgModule({
  imports: [
    CommonModule,

    DragDropModule,
    MatIconModule,
    EditorModule,
    SharedModule,

    TopicRoutingModule
  ],
  declarations: [TopicComponent]
})
export class TopicModule { }
