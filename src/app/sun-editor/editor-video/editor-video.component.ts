import { Component, OnInit } from '@angular/core';
import { EditorService, DocumentNode } from '../editor.service';

@Component({
  selector: 'app-editor-video',
  templateUrl: './editor-video.component.html',
  styleUrls: ['./editor-video.component.scss']
})
export class EditorVideoComponent implements OnInit {

  constructor(public service: EditorService) { }

  ngOnInit() {
  }

}
