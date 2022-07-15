import { Component, Input, OnInit } from '@angular/core';
import { EditorService, DocumentNode } from '../editor.service';

@Component({
  selector: 'app-editor-file',
  templateUrl: './editor-file.component.html',
  styleUrls: ['./editor-file.component.scss']
})
export class EditorFileComponent implements OnInit {

  @Input() node: DocumentNode = new DocumentNode();

  constructor(public service: EditorService) { }

  ngOnInit() {
  }

}
