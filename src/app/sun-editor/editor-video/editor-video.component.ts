import { Component, Input, OnInit } from '@angular/core';
import { EditorService, DocumentNode } from '../editor.service';

@Component({
  selector: 'app-editor-video',
  templateUrl: './editor-video.component.html',
  styleUrls: ['./editor-video.component.scss']
})
export class EditorVideoComponent implements OnInit {

  @Input() node: DocumentNode = new DocumentNode();

  constructor(public service: EditorService) { }

  ngOnInit() {
  }

}
