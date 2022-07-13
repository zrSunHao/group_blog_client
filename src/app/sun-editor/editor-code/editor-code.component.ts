import { Component, OnInit } from '@angular/core';
import { EditorService, DocumentNode } from '../editor.service';

@Component({
  selector: 'app-editor-code',
  templateUrl: './editor-code.component.html',
  styleUrls: ['./editor-code.component.scss']
})
export class EditorCodeComponent implements OnInit {

  constructor(public service: EditorService) { }

  ngOnInit() {
  }

}
