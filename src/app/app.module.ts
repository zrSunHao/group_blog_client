import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { SunTreeComponent } from './sun-tree/sun-tree.component';
import { TreeService } from './sun-tree/tree.service';


import { CommonModule } from '@angular/common';
import { SunEditorModule } from './sun-editor/sun-editor.module';

@NgModule({
  declarations: [
    AppComponent,
    SunTreeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    DragDropModule,
    SunEditorModule
  ],
  providers: [TreeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
