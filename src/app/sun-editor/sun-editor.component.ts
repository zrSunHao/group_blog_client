import { Component, OnInit } from '@angular/core';
import { EditorService, DocumentNode } from './editor.service';

@Component({
  selector: 'app-sun-editor',
  templateUrl: './sun-editor.component.html',
  styleUrls: ['./sun-editor.component.scss']
})
export class SunEditorComponent implements OnInit {

  constructor(public service: EditorService) { }

  ngOnInit() {
  }

}
