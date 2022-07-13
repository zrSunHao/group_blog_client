import { Component, OnInit } from '@angular/core';
import { EditorService, DocumentNode } from '../editor.service';

@Component({
  selector: 'app-editor-link',
  templateUrl: './editor-link.component.html',
  styleUrls: ['./editor-link.component.scss']
})
export class EditorLinkComponent implements OnInit {

  constructor(public service: EditorService) { }

  ngOnInit() {
  }

}
