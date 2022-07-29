import { Component, Input, OnInit } from '@angular/core';
import { EditorService, DocumentNode, DocumentNodeType } from './editor.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  nodeType = DocumentNodeType;
  @Input() nodes: DocumentNode[] = [];

  constructor(public service: EditorService) { }

  ngOnInit() {
  }

}
