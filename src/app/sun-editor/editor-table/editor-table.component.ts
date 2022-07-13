import { Component, OnInit } from '@angular/core';
import { EditorService, DocumentNode } from '../editor.service';

@Component({
  selector: 'app-editor-table',
  templateUrl: './editor-table.component.html',
  styleUrls: ['./editor-table.component.scss']
})
export class EditorTableComponent implements OnInit {

  constructor(public service: EditorService) { }

  ngOnInit() {
  }

}
