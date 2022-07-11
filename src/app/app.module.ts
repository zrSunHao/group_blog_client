import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {DragDropModule} from '@angular/cdk/drag-drop';

// // Import all Froala Editor plugins.
import 'froala-editor/js/plugins.pkgd.min.js';

// Import a Froala Editor language file.
import 'froala-editor/js/languages/zh_cn.js';

// Import a third-party plugin.
import 'froala-editor/js/third_party/font_awesome.min';
import 'froala-editor/js/third_party/image_tui.min';
// import 'froala-editor/js/third_party/spell_checker.min';
import 'froala-editor/js/third_party/embedly.min';

// Import Angular plugin.
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { SunTreeComponent } from './sun-tree/sun-tree.component';
import { TreeService } from './sun-tree/tree.service';

@NgModule({
  declarations: [	
    AppComponent,
      SunTreeComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    DragDropModule,

    FroalaEditorModule,
    FroalaViewModule
  ],
  providers: [TreeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
