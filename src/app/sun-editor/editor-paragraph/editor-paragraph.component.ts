import { Component, OnInit } from '@angular/core';
import { EditorService, DocumentNode } from '../editor.service';

@Component({
  selector: 'app-editor-paragraph',
  templateUrl: './editor-paragraph.component.html',
  styleUrls: ['./editor-paragraph.component.scss']
})
export class EditorParagraphComponent implements OnInit {

  constructor(public service: EditorService) { }

  ngOnInit() {
  }

}
