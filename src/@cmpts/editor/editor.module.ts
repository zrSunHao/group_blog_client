import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { SharedModule } from 'src/@shared/shared.module';

import { EditorComponent } from './editor.component';
import { AudioComponent } from './audio/audio.component';
import { CodeComponent } from './code/code.component';
import { FileComponent } from './file/file.component';
import { HeadlineComponent } from './headline/headline.component';
import { ImgComponent } from './img/img.component';
import { LinkComponent } from './link/link.component';
import { ListComponent } from './list/list.component';
import { ParagraphComponent } from './paragraph/paragraph.component';
import { QuoteComponent } from './quote/quote.component';
import { TableComponent } from './table/table.component';
import { VideoComponent } from './video/video.component';
import { TextComponent } from './text/text.component';
import { EditorService } from './editor.service';
import { OperateComponent } from './operate/operate.component';
import { TreeComponent } from './tree/tree.component';

const mats = [MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule, MatMenuModule, ClipboardModule,];
const cmpts = [EditorComponent, TreeComponent, OperateComponent,
  HeadlineComponent, ParagraphComponent, TableComponent, ListComponent, CodeComponent,
  FileComponent, ImgComponent, AudioComponent, VideoComponent,
  LinkComponent, QuoteComponent,TextComponent];


@NgModule({
  imports: [CommonModule, FormsModule, ...mats, SharedModule,],
  declarations: [...cmpts],
  exports: [EditorComponent, TreeComponent],
  providers: [EditorService]
})
export class EditorModule { }
