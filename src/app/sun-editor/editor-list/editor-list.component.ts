import { Component, OnInit } from '@angular/core';
import { EditorService, DocumentNode } from '../editor.service';

@Component({
  selector: 'app-editor-list',
  templateUrl: './editor-list.component.html',
  styleUrls: ['./editor-list.component.scss']
})
export class EditorListComponent implements OnInit {

  constructor(public service: EditorService) { }

  ngOnInit() {
  }

}
