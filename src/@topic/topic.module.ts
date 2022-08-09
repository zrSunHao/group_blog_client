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
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';

import { SharedModule } from 'src/@shared/shared.module';
import { EditorModule } from 'src/@cmpts/editor/editor.module';
import { ColumnItemModule } from 'src/@cmpts/column-item/column-item.module';
import { NoteItemModule } from 'src/@cmpts/note-item/note-item.module';

import { TopicRoutingModule } from './topic.module.routing';
import { TopicService } from './topic.service';
import { TopicComponent } from './topic.component';
import { NoteComponent } from './note/note.component';
import { ColumnComponent } from './column/column.component';
import { TopicItemComponent } from './cmpts/topic-item/topic-item.component';
import { DialogTopicComponent } from './dialog-topic/dialog-topic.component';
import { DialogDomainComponent } from './dialog-domain/dialog-domain.component';
import { DialogColumnComponent } from './dialog-column/dialog-column.component';
import { DomainComponent } from './cmpts/domain/domain.component';
import { DialogDomainSequenceComponent } from './dialog-domain-sequence/dialog-domain-sequence.component';
import { DialogNoteComponent } from './dialog-note/dialog-note.component';
import { DialogNoteSequenceComponent } from './dialog-note-sequence/dialog-note-sequence.component';
import { DialogNoteToColumnComponent } from './dialog-note-to-column/dialog-note-to-column.component';

const cores = [CommonModule, FormsModule, ReactiveFormsModule,];
const mats = [DragDropModule, MatButtonModule, MatMenuModule, MatIconModule, MatTooltipModule,
  MatInputModule, MatFormFieldModule, MatDialogModule, MatSelectModule];
const shareds = [EditorModule, SharedModule, NoteItemModule, ColumnItemModule];
const cmpts = [TopicComponent, NoteComponent, ColumnComponent, TopicItemComponent, DomainComponent,
  DialogTopicComponent, DialogDomainComponent, DialogColumnComponent, DialogDomainSequenceComponent,
  DialogNoteComponent, DialogNoteSequenceComponent, DialogNoteToColumnComponent]

@NgModule({
  imports: [...cores, ...mats, ...shareds, TopicRoutingModule],
  declarations: [...cmpts],
  providers: [TopicService]
})
export class TopicModule { }
