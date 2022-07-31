import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';

import { SharedModule } from 'src/@shared/shared.module';
import { EditorModule } from 'src/@cmpts/editor/editor.module';
import { ColumnItemModule } from 'src/@cmpts/column-item/column-item.module';
import { NoteItemModule } from 'src/@cmpts/note-item/note-item.module';

import { TopicComponent } from './topic.component';
import { TopicRoutingModule } from './topic.module.routing';
import { NoteComponent } from './note/note.component';
import { ColumnComponent } from './column/column.component';
import { TopicItemComponent } from './cmpts/topic-item/topic-item.component';
import { DialogTopicComponent } from './dialog-topic/dialog-topic.component';
import { DialogDomainComponent } from './dialog-domain/dialog-domain.component';

const cores = [CommonModule, FormsModule, ReactiveFormsModule,];
const mats = [DragDropModule, MatButtonModule, MatMenuModule, MatIconModule, MatInputModule, MatFormFieldModule, MatDialogModule];
const shareds = [EditorModule, SharedModule, NoteItemModule, ColumnItemModule];
const cmpts = [TopicComponent, NoteComponent, ColumnComponent, TopicItemComponent, DialogTopicComponent, DialogDomainComponent]

@NgModule({
  imports: [...cores, ...mats, ...shareds, TopicRoutingModule],
  declarations: [...cmpts]
})
export class TopicModule { }
