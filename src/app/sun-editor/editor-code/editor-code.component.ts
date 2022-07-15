import { Component, Input, OnInit } from '@angular/core';
import { EditorService, DocumentNode } from '../editor.service';

@Component({
  selector: 'app-editor-code',
  templateUrl: './editor-code.component.html',
  styleUrls: ['./editor-code.component.scss']
})
export class EditorCodeComponent implements OnInit {

  @Input() node: DocumentNode = new DocumentNode();

  constructor(public service: EditorService) { }

  ngOnInit() {
  }

}
