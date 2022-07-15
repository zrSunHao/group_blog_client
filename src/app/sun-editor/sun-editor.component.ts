import { Component, Input, OnInit } from '@angular/core';
import { EditorService, DocumentNode, DocumentNodeType } from './editor.service';

@Component({
  selector: 'app-sun-editor',
  templateUrl: './sun-editor.component.html',
  styleUrls: ['./sun-editor.component.scss']
})
export class SunEditorComponent implements OnInit {

  nodeType = DocumentNodeType;
  @Input() nodes: DocumentNode[] = [];

  constructor(public service: EditorService) { }

  ngOnInit() {
  }

}
