import { Component, OnInit } from '@angular/core';
import { EditorService, DocumentNode } from '../editor.service';

@Component({
  selector: 'app-editor-img',
  templateUrl: './editor-img.component.html',
  styleUrls: ['./editor-img.component.scss']
})
export class EditorImgComponent implements OnInit {

  constructor(public service: EditorService) { }

  ngOnInit() {
  }

}
