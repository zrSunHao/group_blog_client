import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { SunEditorComponent } from './sun-editor.component';
import { EditorAudioComponent } from './editor-audio/editor-audio.component';
import { EditorCodeComponent } from './editor-code/editor-code.component';
import { EditorFileComponent } from './editor-file/editor-file.component';
import { EditorHeadlineComponent } from './editor-headline/editor-headline.component';
import { EditorImgComponent } from './editor-img/editor-img.component';
import { EditorLinkComponent } from './editor-link/editor-link.component';
import { EditorListComponent } from './editor-list/editor-list.component';
import { EditorParagraphComponent } from './editor-paragraph/editor-paragraph.component';
import { EditorQuoteComponent } from './editor-quote/editor-quote.component';
import { EditorTableComponent } from './editor-table/editor-table.component';
import { EditorVideoComponent } from './editor-video/editor-video.component';
import { EditorService } from './editor.service';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule, 
    MatFormFieldModule,
  ],
  declarations: [
    SunEditorComponent,
    EditorAudioComponent,
    EditorCodeComponent,
    EditorFileComponent,
    EditorHeadlineComponent,
    EditorImgComponent,
    EditorLinkComponent,
    EditorListComponent,
    EditorParagraphComponent,
    EditorQuoteComponent,
    EditorTableComponent,
    EditorVideoComponent,
  ],
  exports:[
    SunEditorComponent
  ],
  providers:[
    EditorService
  ]
})
export class SunEditorModule { }
