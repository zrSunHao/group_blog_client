import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { EditorModule } from 'src/@cmpts/editor/editor.module';
import { SharedModule } from 'src/@shared/shared.module';

import { TopicComponent } from './topic.component';
import { TopicRoutingModule } from './topic.module.routing';
import { NoteComponent } from './note/note.component';
import { ColumnComponent } from './column/column.component';
import { TopicItemComponent } from './cmpts/topic-item/topic-item.component';

const mats = [DragDropModule, MatButtonModule, MatMenuModule, MatIconModule,];

@NgModule({
  imports: [
    CommonModule,
    ...mats,
    EditorModule,
    SharedModule,
    TopicRoutingModule
  ],
  declarations: [TopicComponent, NoteComponent,ColumnComponent,TopicItemComponent]
})
export class TopicModule { }
