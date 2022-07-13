import { Component, OnInit } from '@angular/core';
import { EditorService, DocumentNode } from '../editor.service';

@Component({
  selector: 'app-editor-file',
  templateUrl: './editor-file.component.html',
  styleUrls: ['./editor-file.component.scss']
})
export class EditorFileComponent implements OnInit {

  constructor(public service: EditorService) { }

  ngOnInit() {
  }

}
