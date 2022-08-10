import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { SharedModule } from 'src/@shared/shared.module';
import { EditorModule } from 'src/@cmpts/editor/editor.module';

import { ReadComponent } from './read.component';
import { ReadRoutingModule } from './read.module.routing';
import { ReadService } from './read.service';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    SharedModule,
    EditorModule,
    ReadRoutingModule
  ],
  declarations: [ReadComponent],
  providers: [ReadService]
})
export class ReadModule { }
